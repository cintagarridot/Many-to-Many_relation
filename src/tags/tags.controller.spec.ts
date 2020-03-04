import { Test } from '@nestjs/testing';
import { tagsController } from './tags.controller';
import { TagService } from './tags.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {TagEntity} from "./tags.entity";

describe('TagsController', () => {
  let tagController: tagsController;
  let tagService: TagService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([TagEntity])],
      controllers: [ tagsController ],
      providers: [ TagService ],
    }).compile();

    tagService = module.get<TagService>(TagService);
    tagController = module.get<tagsController>(tagsController);
  });

  describe('findAll', () => {
    it('should return an array of tags', async () => {
      const tags : TagEntity[] = [];
      const createTag = (id, name) => {
        const tag = new TagEntity();
        tag.id = id;
        tag.tag = name;
        return tag;
      }
      tags.push(createTag(1, 'angularjs'));
      tags.push(createTag(2, 'reactjs'));

      jest.spyOn(tagService, 'findAll').mockImplementation(() => Promise.resolve(tags));
      
      const findAllResult = await tagController.findAll();
      expect(findAllResult).toBe(tags);
    });
  });
});