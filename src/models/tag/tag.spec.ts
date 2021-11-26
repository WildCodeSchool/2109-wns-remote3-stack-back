import { ApolloServer, gql } from 'apollo-server-express';
import { prisma } from '../../utils/prisma/prisma-client';
import createApolloServer from '../../apolloServer';

let server: ApolloServer;

let id: string;
let isDeleted : boolean;

beforeAll(async () => {
  server = await createApolloServer();
});

describe('Tag Resolver', () => {
  it('should create a new tag', async () => {
    const addTagMutation = gql`
      mutation Mutation($label: String!, $color: String!) {
        createTag(label: $label, color: $color) {
          id
          label
          color
        }
      }
    `;

    const variables = {
      label: 'TagTest',
      color: 'colortest',
    };

    const response = await server.executeOperation({
      query: addTagMutation,
      variables,
    });

    id = response.data?.createTag.id;
    expect(response.data?.createTag.id).toEqual(id);
    expect(response.data?.createTag).toHaveProperty('label', variables.label);
    expect(response.data?.createTag).toHaveProperty('color', variables.color);
  });

  it('should get all tags', async () => {
    const query = gql`
    query Query {
      getAllTags {
        id
        label
        color
      }
    }
  `;
    const response = await server.executeOperation({ query });
    expect(Array.isArray(response.data?.getAllTags)).toBe(true);
  });

  it('should get one tag', async () => {
    const oneTagQuery = gql`
    query GetTagByID($getTagByIdId: String!) {
      getTagByID(id: $getTagByIdId) {
        id
        label
        color
      }
    }
    `;

    const variables = {
      getTagByIdId: id,
    };

    const response = await server.executeOperation({
      query: oneTagQuery,
      variables,
    });
    const tagResponse = {
      TagByIdId: id,
      label: 'TagTest',
      color: 'colortest',
    };

    expect(response.data?.getTagByID).toHaveProperty('id', id);
    expect(response.data?.getTagByID).toHaveProperty('label', tagResponse.label);
    expect(response.data?.getTagByID).toHaveProperty('color', tagResponse.color);
  });

  it('should update the created task', async () => {
    const updateTagMutation = gql`
    mutation Mutation($updateTagId: String!, $label: String!, $color: String!) {
      updateTag(id: $updateTagId, label: $label, color: $color) {
        id
        label
        color
      }
    }
    `;

    const variables = {
      updateTagId: id,
      label: 'updatedtag',
      color: 'colorUpdated',
    };

    const response = await server.executeOperation({
      query: updateTagMutation,
      variables,
    });
    id = response.data?.updateTag.id;
    expect(response.data?.updateTag).toHaveProperty('label', variables.label);
    expect(response.data?.updateTag).toHaveProperty('color', variables.color);
    expect(response.data?.updateTag.id).toEqual(id);
  });

  it('should delete the created tag', async () => {
    const deleteTagById = gql`
    mutation Mutation($deleteTagByIdId: String!) {
      deleteTagById(id: $deleteTagByIdId) {
        id
        label
        color
      }
    }
    `;

    const variables = {
      deleteTagByIdId: id,
    };

    const response = await server.executeOperation({
      query: deleteTagById,
      variables,
    });

    if (response.data?.deleteTagById.id) {
      isDeleted = false;
    }
    expect(isDeleted).toEqual(false);
  });

  afterAll(async () => {
    if (isDeleted) {
      await prisma.tag.delete({
        where: { id },
      });
    }
    await prisma.$disconnect();
  });
});
