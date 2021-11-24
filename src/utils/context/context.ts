import { getUserId } from '../auth/authUtils';
import { IContext } from './interface/context.interface';

async function appContext(context: IContext) {
  let userId;
  try {
    userId = context.req.cookies && await getUserId(context.req, context.res);
  } catch (error) {
    // fail silently, as error handling will be done in other guards
    userId = '';
  }
  return {
    ...context,
    userId,
  };
}

export { appContext as default };
