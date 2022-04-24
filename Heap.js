class Heap {
  constructor(compare = (a, b) => (b - a)) {
    const heapArray = [];
    const compareFunc = compare;
    
    this.push = (value) => {
      heapArray.push(value);
      let curIndex = heapArray.length;
      while (curIndex > 1) {
        const parentIndex = Math.floor(curIndex / 2);
        const [realCurIndex, realParentIndex] = [curIndex - 1, parentIndex - 1];
        if (compareFunc(heapArray[realCurIndex], heapArray[realParentIndex]) >= 0) {
          break;
        }
        [heapArray[realCurIndex], heapArray[realParentIndex]] = [heapArray[realParentIndex], heapArray[realCurIndex]];
        curIndex = parentIndex;
      }
    };
    
    this.top = () => {
      if (heapArray.legnth <= 0) {
        return null;
      }
      return heapArray[0];
    };
    
    this.pop = () => {
      if (heapArray.length <= 0) {
        return null;
      }
      if (heapArray.length === 1) {
        return heapArray.pop();
      }
      const valueToReturn = heapArray[0];
      heapArray[0] = heapArray.pop();
      let curIndex = 1;
      while (curIndex * 2 <= heapArray.length) {
        const [leftIndex, rightIndex] = [curIndex * 2, curIndex * 2 + 1];
        const [realCurIndex, realLeftIndex, realRightIndex] = [curIndex - 1, leftIndex - 1, rightIndex - 1];
        const [noLowerThanLeft, noLowerThanRight] = [
          compareFunc(heapArray[realLeftIndex], heapArray[realCurIndex]) >= 0,
          compareFunc(heapArray[realRightIndex], heapArray[realCurIndex]) >= 0,
        ];
        if (leftIndex <= heapArray.length && rightIndex > heapArray.length) {
          if (noLowerThanLeft) {
            break;
          }
          [heapArray[realCurIndex], heapArray[realLeftIndex]] = [heapArray[realLeftIndex], heapArray[realCurIndex]];
          curIndex = leftIndex;
          continue;
        }
        if (noLowerThanLeft && noLowerThanRight) {
          break;
        } else if (!noLowerThanLeft && noLowerThanRight) {
          [heapArray[realCurIndex], heapArray[realLeftIndex]] = [heapArray[realLeftIndex], heapArray[realCurIndex]];
          curIndex = leftIndex;
        } else if (noLowerThanLeft && !noLowerThanRight) {
          [heapArray[realCurIndex], heapArray[realRightIndex]] = [heapArray[realRightIndex], heapArray[realCurIndex]];
          curIndex = rightIndex;
        } else {
          if (compareFunc(heapArray[realLeftIndex], heapArray[realRightIndex]) <= 0) {
            [heapArray[realCurIndex], heapArray[realLeftIndex]] = [heapArray[realLeftIndex], heapArray[realCurIndex]];
            curIndex = leftIndex;
          } else {
            [heapArray[realCurIndex], heapArray[realRightIndex]] = [heapArray[realRightIndex], heapArray[realCurIndex]];
            curIndex = rightIndex;
          }
        }
      }
      return valueToReturn;
    };
  }
}
