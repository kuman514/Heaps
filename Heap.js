class Heap {
  constructor(compareFunction) {
    // return of the compare function
    // lower than 0: lhs is prior
    // higher than 0: rhs is prior
    // exactly 0: same priority

    this.compareFunction = compareFunction;
    this.tree = [null];

    this.push = (val) => {
      let curIndex = this.tree.length;
      this.tree.push(val);

      while (curIndex > 1) {
        const parent = Math.floor(curIndex / 2);
        if (this.compareFunction(this.tree[curIndex], this.tree[parent]) < 0) {
          const swapTmp = this.tree[curIndex];
          this.tree[curIndex] = this.tree[parent];
          this.tree[parent] = swapTmp;
          curIndex = parent;
        } else {
          break;
        }
      }
    }

    this.pop = () => {
      if (this.tree.length <= 1) {
        return null;
      }

      if (this.tree.length === 2) {
        return this.tree.pop();
      } else if (this.tree.length > 2) {
        const returnVal = this.tree[1];
        this.tree[1] = this.tree.pop();

        let curIndex = 1;
        while (curIndex < this.tree.length) {
          const lchild = curIndex * 2;
          const rchild = curIndex * 2 + 1;
          let continuable = true;

          if (lchild >= this.tree.length) {
            continuable = false;
          } else if (rchild >= this.tree.length) {
            if (this.compareFunction(this.tree[curIndex], this.tree[lchild]) > 0) {
              const swapTmp = this.tree[curIndex];
              this.tree[curIndex] = this.tree[lchild];
              this.tree[lchild] = swapTmp;
              curIndex = lchild;
            } else {
              continuable = false;
            }
          } else {
            const priorL = this.compareFunction(this.tree[curIndex], this.tree[lchild]);
            const priorR = this.compareFunction(this.tree[curIndex], this.tree[rchild]);

            if (priorL > 0 && priorR <= 0) {
              const swapTmp = this.tree[curIndex];
              this.tree[curIndex] = this.tree[lchild];
              this.tree[lchild] = swapTmp;
              curIndex = lchild;
            } else if (priorL <= 0 && priorR > 0) {
              const swapTmp = this.tree[curIndex];
              this.tree[curIndex] = this.tree[rchild];
              this.tree[rchild] = swapTmp;
              curIndex = rchild;
            } else if (priorL > 0 && priorR > 0) {
              const priorBoth = this.compareFunction(this.tree[lchild], this.tree[rchild]);
              if (priorBoth <= 0) {
                const swapTmp = this.tree[curIndex];
                this.tree[curIndex] = this.tree[lchild];
                this.tree[lchild] = swapTmp;
                curIndex = lchild;
              } else {
                const swapTmp = this.tree[curIndex];
                this.tree[curIndex] = this.tree[rchild];
                this.tree[rchild] = swapTmp;
                curIndex = rchild;
              }
            } else if (priorL <= 0 && priorR <= 0) {
              continuable = false;
            }
          }

          if (!continuable) {
            break;
          }
        }

        return returnVal;
      }
    }
  }
}
