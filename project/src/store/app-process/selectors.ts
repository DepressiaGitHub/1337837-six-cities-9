import { NameSpace } from '../../const';
import { State } from '../../types/state';


export const getHoverOffer = (state: State): number | null => state[NameSpace.App].offerByHover;
