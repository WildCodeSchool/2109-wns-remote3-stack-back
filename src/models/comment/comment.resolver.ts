import {
  Resolver, Query, Arg, Mutation, Args, Ctx, PubSub, PubSubEngine,
} from 'type-graphql';
import IComment from '@comment/types/comment.type';
import CommentService from '@comment/comment.service';
import ICommentPayload from '@comment/types/createCommentPayload.args';
import { IContext } from '@utils/context/interface/context.interface';

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
  async createComment(
    @Args() payload: ICommentPayload,
    @Ctx() context: IContext,
    @PubSub() pubSub: PubSubEngine,
  ):Promise<IComment> {
    return CommentService().createNewComment(payload, context, pubSub);
  }

  //* Update one comment
  @Mutation(() => IComment)
  async updateComment(
    @Args()payload: ICommentPayload,
    @Arg('id') id: string,
    @Ctx() context: IContext,
    @PubSub() pubSub: PubSubEngine,
  ):Promise<IComment> {
    return CommentService().updateCommentById(payload, id, context, pubSub);
  }

  //* Delete a comment
  @Mutation(() => IComment)
  async deleteCommentById(
    @Arg('id') id: string,
    @Ctx() context: IContext,
    @PubSub() pubSub: PubSubEngine,
  ): Promise<IComment> {
    return CommentService().deleteById(id, context, pubSub);
  }
}
