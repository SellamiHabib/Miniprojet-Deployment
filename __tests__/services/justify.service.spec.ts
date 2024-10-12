import JustifyService from '../../src/services/justify.service';

describe('JustifyService', () => {
  let justifyService: JustifyService;
  const maxLineLength = 80;
  beforeEach(() => {
    justifyService = new JustifyService(maxLineLength);
  });

  describe('justifyText', () => {
    it('should justify text correctly when a line is shorter than max length', () => {
      const input = 'Hello world';
      const result = justifyService.justifyText(input);
      const expected = 'Hello world';
      expect(result).toBe(expected);
    });

    it('should split text into multiple justified lines', () => {
      const input = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec odio ipsum.';
      const result = justifyService.justifyText(input);

      const expected = 'Lorem  ipsum  dolor  sit  amet, consectetur adipiscing elit. Vestibulum nec odio\n' + 'ipsum.';
      expect(result).toBe(expected);
    });

    it('should justify text with exact max line length', () => {
      const input = 'Lorem ipsum dolor sit amet consectetur adipiscing elit';
      const result = justifyService.justifyText(input);

      // Expected justified line
      const expected = 'Lorem ipsum dolor sit amet consectetur adipiscing elit';
      expect(result).toBe(expected);
    });

    it('should handle a single word without justification', () => {
      const input = 'Supercalifragilisticexpialidocious';
      const result = justifyService.justifyText(input);
      const expected = 'Supercalifragilisticexpialidocious';
      expect(result).toBe(expected);
    });

    it('should not add extra spaces on the last line', () => {
      const input = 'This is a test of the justify service that should not add extra spaces on the last line.';
      const result = justifyService.justifyText(input);

      const expected =
        'This  is  a  test of the justify service that should not add extra spaces on the\n' + 'last line.';
      expect(result).toBe(expected);
    });
  });

  describe('justifyLine', () => {
    it('should justify a line correctly with even spaces between words', () => {
      const words = ['Lorem', 'ipsum', 'dolor', 'sit'];
      const maxLength = 30;
      const result = justifyService['justifyLine'](words, maxLength);

      const expected = 'Lorem    ipsum    dolor    sit';
      expect(result).toBe(expected);
    });

    it('should justify a line correctly with uneven spaces between words', () => {
      const words = ['Hello', 'world'];
      const maxLength = 15; // Example length
      const result = justifyService['justifyLine'](words, maxLength);

      const expected = 'Hello     world'; // Extra spaces distributed
      expect(result).toBe(expected);
    });

    it('should return the word itself if only one word is given', () => {
      const result = justifyService.justifyText(
        'Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte, mes yeux se fermaient si vite que je n’avais pas le temps de me dire: «Je m’endors.» Et, une demi-heure après, la pensée qu’il était temps de chercher le sommeil m’éveillait; je voulais poser le volume que je croyais avoir dans les mains et souffler ma lumière; je n’avais pas cessé en dormant de faire des réflexions sur ce que je venais de lire, mais ces réflexions avaient pris un tour un peu particulier; il me semblait que j’étais moi-même ce dont parlait l’ouvrage: une église, un quatuor, la rivalité de François Ier et de Charles-Quint. \n' +
          '\n' +
          'Cette croyance survivait pendant quelques secondes à mon réveil; elle ne choquait pas ma raison, mais pesait comme des écailles sur mes yeux et les empêchait de se rendre compte que le bougeoir n’était plus allumé. \n' +
          ' Puis elle commençait à me devenir inintelligible, comme après la métempsycose les pensées d’une existence antérieure; le sujet du livre se détachait de moi, j’étais libre de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais bien étonné de trouver autour de moi une obscurité, douce et reposante pour mes yeux, mais peut-être plus encore pour mon esprit, à qui elle apparaissait comme une chose sans cause, incompréhensible, comme une chose vraiment obscure. Je me demandais quelle heure il pouvait être; j’entendais le sifflement des trains qui, plus ou moins éloigné, comme le chant d’un oiseau dans une forêt, relevant les distances, me décrivait l’étendue de la campagne déserte où le voyageur se hâte vers la station prochaine; et le petit chemin qu’il suit va être gravé dans son souvenir par l’excitation qu’il doit à des lieux nouveaux, à des actes inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le suivent encore dans le silence de la nuit, à la douceur prochaine du retour.',
      );
      const expected =
        'Longtemps, je me suis couché de bonne heure. Parfois, à peine ma bougie éteinte,\n' +
        'mes  yeux  se  fermaient  si  vite  que  je n’avais pas le temps de me dire: «Je\n' +
        'm’endors.»  Et, une demi-heure après, la pensée qu’il était temps de chercher le\n' +
        'sommeil  m’éveillait;  je  voulais poser le volume que je croyais avoir dans les\n' +
        'mains  et  souffler  ma  lumière;  je  n’avais pas cessé en dormant de faire des\n' +
        'réflexions  sur  ce  que  je venais de lire, mais ces réflexions avaient pris un\n' +
        'tour  un  peu  particulier;  il me semblait que j’étais moi-même ce dont parlait\n' +
        'l’ouvrage:   une  église,  un  quatuor,  la  rivalité  de  François  Ier  et  de\n' +
        'Charles-Quint.  Cette croyance survivait pendant quelques secondes à mon réveil;\n' +
        'elle  ne  choquait pas ma raison, mais pesait comme des écailles sur mes yeux et\n' +
        'les empêchait de se rendre compte que le bougeoir n’était plus allumé. Puis elle\n' +
        'commençait  à me devenir inintelligible, comme après la métempsycose les pensées\n' +
        'd’une existence antérieure; le sujet du livre se détachait de moi, j’étais libre\n' +
        'de m’y appliquer ou non; aussitôt je recouvrais la vue et j’étais bien étonné de\n' +
        'trouver  autour  de  moi  une  obscurité, douce et reposante pour mes yeux, mais\n' +
        'peut-être  plus  encore pour mon esprit, à qui elle apparaissait comme une chose\n' +
        'sans  cause, incompréhensible, comme une chose vraiment obscure. Je me demandais\n' +
        'quelle  heure il pouvait être; j’entendais le sifflement des trains qui, plus ou\n' +
        'moins  éloigné,  comme  le  chant  d’un  oiseau  dans  une  forêt,  relevant les\n' +
        'distances,  me décrivait l’étendue de la campagne déserte où le voyageur se hâte\n' +
        'vers  la station prochaine; et le petit chemin qu’il suit va être gravé dans son\n' +
        'souvenir  par  l’excitation  qu’il  doit  à  des  lieux  nouveaux,  à  des actes\n' +
        'inaccoutumés, à la causerie récente et aux adieux sous la lampe étrangère qui le\n' +
        'suivent encore dans le silence de la nuit, à la douceur prochaine du retour.';
      expect(result).toBe(expected);
    });
  });
});
