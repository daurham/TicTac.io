export type NinthTypes = any; //'ninth1' | 'ninth2' | 'ninth3' | 'ninth4' | 'ninth5' | 'ninth6' | 'ninth7' | 'ninth8' | 'ninth9';

export type BoardArrElem = {
  ninth: NinthTypes;
  value: any; //'' | 'X' | 'O';
};
export type BoardArray = BoardArrElem[];