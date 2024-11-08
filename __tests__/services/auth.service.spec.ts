// import { StatusCodes } from 'http-status-codes';
// import { UserRepository } from '../../src/repositories/user.repository';
// import AuthService from '../../src/services/auth.service';
// import { CustomError } from '../../src/utils/CustomError';
// import * as jwtUtils from '../../src/utils/jwtUtils';
// import { v4 as uuidv4 } from 'uuid';
// import Redis from 'ioredis-mock';
// // Mocking dependencies
// jest.mock('../../src/repositories/user.repository');
// jest.mock('../../src/utils/jwtUtils', () => {
//   return {
//     signToken: jest.fn(),
//   };
// });
//
// jest.mock('uuid', () => {
//   return {
//     v4: jest.fn(),
//   };
// });
//
// describe('AuthService', () => {
//   let authService;
//   let userRepositoryMock;
//   const email = 'test@example.com';
//
//   beforeEach(() => {
//     userRepositoryMock = new UserRepository(new Redis());
//     authService = new AuthService(userRepositoryMock);
//   });
//
//   describe('generateToken', () => {
//     it('should create a new user and return a token when user does not exist', async () => {
//       // Arrange
//       const id = 'mocked-uuid';
//       const token = 'mocked-jwt-token';
//       const newUser = {
//         id: id,
//         email,
//         jwtToken: token,
//         wordCount: 0,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };
//
//       userRepositoryMock.get.mockResolvedValue(null); // Simulate user not found
//       (uuidv4 as jest.Mock).mockReturnValue(id);
//       authService.createUser = jest.fn().mockResolvedValue(newUser);
//
//       const result = await authService.generateToken(email);
//
//       expect(userRepositoryMock.get).toHaveBeenCalledWith(email);
//       expect(authService.createUser).toHaveBeenCalledWith(email);
//       expect(result).toBe(token);
//     });
//
//     it('should update the token if the user exists', async () => {
//       const existingUser = {
//         id: 'existing-uuid',
//         email,
//         jwtToken: 'old-jwt-token',
//         wordCount: 0,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };
//       const newToken = 'new-jwt-token';
//
//       userRepositoryMock.get.mockResolvedValue(existingUser); // simulate existing user
//       (jwtUtils.signToken as jest.Mock).mockReturnValue(newToken);
//       userRepositoryMock.set.mockResolvedValue({
//         ...existingUser,
//         jwtToken: newToken,
//       });
//
//       const result = await authService.generateToken(email);
//
//       expect(userRepositoryMock.get).toHaveBeenCalledWith(email);
//       expect(jwtUtils.signToken as jest.Mock).toHaveBeenCalledWith(email);
//       expect(userRepositoryMock.set).toHaveBeenCalledWith(email, {
//         ...existingUser,
//         jwtToken: newToken,
//       });
//       expect(result).toBe(newToken);
//     });
//   });
//
//   describe('getUserDetails', () => {
//     it('should return user details if the user exists', async () => {
//       // Arrange
//       const id = 'user-uuid';
//       const user = {
//         id: id,
//         email,
//         jwtToken: 'some-token',
//         wordCount: 0,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };
//
//       userRepositoryMock.get.mockResolvedValue(user);
//
//       const result = await authService.getUserDetails(email);
//
//       // Assert
//       expect(userRepositoryMock.get).toHaveBeenCalledWith(email);
//       expect(result).toBe(user);
//     });
//
//     it('should throw an error if the user does not exist', async () => {
//       // Arrange
//       const email = 'nonexistent@example.com';
//       userRepositoryMock.get.mockResolvedValue(null);
//
//       // Act & Assert
//       await expect(authService.getUserDetails(email)).rejects.toThrow(
//         new CustomError('User not found', StatusCodes.NOT_FOUND),
//       );
//       expect(userRepositoryMock.get).toHaveBeenCalledWith(email);
//     });
//   });
//
//   describe('updateWordCount', () => {
//     it('should update the word count of an existing user', async () => {
//       const id = 'user-uuid';
//       const initialWordCount = 10;
//       const newWordCount = 20;
//
//       const user = {
//         id: id,
//         email,
//         jwtToken: 'some-token',
//         wordCount: initialWordCount,
//         createdAt: new Date(),
//         updatedAt: new Date(),
//       };
//       const updatedUser = {
//         ...user,
//         wordCount: user.wordCount + newWordCount,
//       };
//       userRepositoryMock.get.mockResolvedValue(user);
//       userRepositoryMock.set.mockResolvedValue({ ...user, wordCount: user.wordCount + newWordCount });
//       const result = await authService.updateWordCount(email, newWordCount);
//
//       expect(userRepositoryMock.get).toHaveBeenCalledWith(email);
//       expect(userRepositoryMock.set).toHaveBeenCalledWith(email, updatedUser);
//       expect(result.wordCount).toBe(updatedUser.wordCount);
//     });
//
//     it('should throw an error if the user does not exist', async () => {
//       // Arrange
//       const email = 'nonexistent@example.com';
//       userRepositoryMock.get.mockResolvedValue(null);
//
//       // Act & Assert
//       await expect(authService.updateWordCount(email, 10)).rejects.toThrow(
//         new CustomError('User not found', StatusCodes.NOT_FOUND),
//       );
//       expect(userRepositoryMock.get).toHaveBeenCalledWith(email);
//     });
//   });
// });
