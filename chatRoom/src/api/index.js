import user from './user';
import group from './group';
import comm from './comm';
import friendly from './friendly';
import expression from './expression';
import messages from './messages';
import jokes from './jokes';
import news from './news';
import todo from './todo';

export default {
    ...user,
    ...group,
    ...comm,
    ...friendly,
    ...expression,
    ...jokes,
    ...news,
    ...messages,
    ...todo
}
