provider "kubernetes" {
  config_path = "~/.kube/config" # Path to your kubeconfig file
}

provider "helm" {
  kubernetes {
    config_path = "~/.kube/config"
  }
}
resource "helm_release" "argocd" {
  name             = "argocd"
  namespace        = "argocd"
  create_namespace = true
  chart            = "argo-cd"
  repository       = "https://argoproj.github.io/argo-helm"
  version          = "5.26.0" # Replace with the desired ArgoCD version



  values = [
    # Optionally, provide a custom values file
  ]
}

resource "kubernetes_namespace" "nodejs" {
  metadata {
    name = "nodejs-app"
  }
}

resource "kubernetes_deployment" "nodejs_backend" {
  metadata {
    name      = "nodejs-backend"
    namespace = kubernetes_namespace.nodejs.metadata[0].name
  }

  spec {
    replicas = 3

    selector {
      match_labels = {
        app = "nodejs-backend"
      }
    }

    template {
      metadata {
        labels = {
          app = "nodejs-backend"
        }
      }

      spec {
        container {
          name  = "nodejs-backend"
          image = "habibsellami3/tp2devops:main"

          port {
            container_port = 3000
          }
          env {
            name  = "REDIS_HOST"
            value = "redis-master"
          }
          env {
            name  = "REDIS_PORT"
            value = "6379"
          }
          env {
            name  = "REDIS_PASSWORD"
            value = "password"
          }
          env {
            name  = "JWT_SECRET"
            value = "production"
          }
          env {
            name  = "APP_URL"
            value = "http://localhost:3000"
          }
          env {
            name  = "PORT"
            value = "3000"
          }
          env {
            name  = "HTTPS_ENABLED"
            value = "false"
          }
        }
      }
    }
  }
}
  resource "kubernetes_service" "nodejs_service" {
    metadata {
      name      = "nodejs-service"
      namespace = kubernetes_namespace.nodejs.metadata[0].name
    }

    spec {
      selector = {
        app = "nodejs-backend"
      }

      port {
        port        = 80
        target_port = 3000
      }

      type = "NodePort"
    }
  }
