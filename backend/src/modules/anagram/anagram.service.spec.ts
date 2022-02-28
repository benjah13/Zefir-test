import { InMemAnagramRepository } from './repository/in-mem-anagram.repository';
import { ConfigProvider } from '../config/config.provider';
import { AnagramService } from './anagram.service';
import { v4 as uuid } from 'uuid';

describe('AnagramService', () => {
  let anagramService: AnagramService;
  let anagramRepository: InMemAnagramRepository;
  const userId = uuid();
  beforeAll(() => {
    anagramRepository = new InMemAnagramRepository();
    const configService = new ConfigProvider();
    anagramService = new AnagramService(anagramRepository, configService);
  });

  it('should generate the anagrams', async () => {
    let count = anagramRepository.count();
    expect(count).toBe(0);
    await anagramService.createAnagram(userId);
    count = anagramRepository.count();
    expect(count).toBe(1);
    const anagrams = await anagramRepository.getByUserId(userId);
    expect(anagrams?.anagramMap).toBeDefined();
  });
});
