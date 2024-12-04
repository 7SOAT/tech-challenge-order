import { Test, TestingModule } from '@nestjs/testing';
import { JwtHelperService } from '../../src/package/jwt-helper/jwt-helper.service';

describe('JwtHelperService', () => {
  let jwtHelperService: JwtHelperService;

  beforeAll(async () => {
    const mockJwtHelperService = {
      decodeToken: jest.fn(),
    };
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        JwtHelperService,
        { provide: JwtHelperService, useValue: mockJwtHelperService },
      ],
    }).compile();

    jwtHelperService = moduleFixture.get<JwtHelperService>(JwtHelperService);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(jwtHelperService).toBeDefined();
  });

  it('should decode a token', async () => {
    const jestSpy = jest.spyOn(jwtHelperService, 'decodeToken');
    jwtHelperService.decodeToken('token');
    expect(jestSpy).toHaveBeenCalled();
  });
});
