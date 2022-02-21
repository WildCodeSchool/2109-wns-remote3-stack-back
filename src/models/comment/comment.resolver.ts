import {
  Resolver, Query, Arg, Mutation, Args,
} from 'type-graphql';
import IComment from '@comment/types/comment.type';
import CommentService from '@comment/comment.service';
import ICommentPayload from '@comment/types/createCommentPayload.args';

@Resolver(() => IComment)
export default class CommentResolver {
  //* Get all Comments
  @Query(() => [IComment])
  async getAllComments(): Promise<IComment[]> {
    return CommentService().allComments();
  }

  //* Get one comment by id
  @Query(() => IComment)
  async getCommentByID(
    @Arg('id') id: string,
  ): Promise<IComment> {
    return CommentService().findCommentById(id);
  }

  //* Create one comment
  @Mutation(() => IComment)
  async createComment(@Args()payload: ICommentPayload):Promise<IComment> {
    return CommentService().createNewComment(payload);
  }

  //* Update one comment
  @Mutation(() => IComment)
  async updateComment(@Args()payload: ICommentPayload, @Arg('id') id: string):Promise<IComment> {
    return CommentService().updateCommentById(payload, id);
  }

  //* Delete a comment
  @Mutation(() => IComment)
  async deleteCommentById(@Arg('id') id: string): Promise<IComment> {
    return CommentService().deleteById(id);
  }
}
