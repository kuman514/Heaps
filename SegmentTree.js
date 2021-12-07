class SegmentTree {
  constructor(arr, initVal, processFunc) {
    this.arr = Array.from(arr);
    this.tree = Array.from(
      { length: 2 ** Math.ceil(Math.log2(this.arr.length) + 1) },
      () => initVal
    );

    this.initTree = (nodeNum, start, end) => {
      if (start == end) {
        this.tree[nodeNum] = this.arr[start];
      } else {
        this.tree[nodeNum] = processFunc(
          this.initTree(2 * nodeNum, start, Math.floor((start + end) / 2)),
          this.initTree(2 * nodeNum + 1, Math.floor((start + end) / 2) + 1, end)
        );
      }
      
      return this.tree[nodeNum];
    };

    this.getAreaVal = (nodeNum, start, end, areaLeft, areaRight) => {
      if (areaLeft > end || areaRight < start) {
        return initVal;
      } else if (areaLeft <= start && end <= areaRight) {
        return this.tree[nodeNum];
      } else {
        return processFunc(
          this.getAreaVal(2 * nodeNum, start, Math.floor((start + end) / 2), areaLeft, areaRight),
          this.getAreaVal(2 * nodeNum + 1, Math.floor((start + end) / 2) + 1, end, areaLeft, areaRight)
        );
      }
    };
    
    this.updateTree = (nodeNum, start, end, index, diff) => {
      if (index < start || index > end) {
        return;
      }

      this.tree[nodeNum] += diff;
      if (start !== end) {
        this.updateTree(2 * nodeNum, start, Math.floor((start + end) / 2), index, diff);
        this.updateTree(2 * nodeNum + 1, Math.floor((start + end) / 2) + 1, end, index, diff);
      }
    };

    this.areaVal = (start, end) => {
      return this.getAreaVal(1, 0, this.arr.length - 1, start - 1, end - 1);
    };

    this.update = (index, val) => {
      const diff = val - this.arr[index - 1];
      this.updateTree(1, 0, this.arr.length - 1, index - 1, diff);
      this.arr[index - 1] = val;
    };

    this.initTree(1, 0, this.arr.length - 1);
  }
}
