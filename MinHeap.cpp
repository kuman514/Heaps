#include <iostream>
#include <cstdio>

// implementing max heap

int end = 1;                // points an empty node that the last node will be inserted in
int arr[200001];            // array to be a heap

void Insert(const int);     // insert a node
int Pop(void);              // pop the root of the heap

int main(void)
{
    int n, input;
    scanf("%d", &n);

    for (int i = 0; i < n; i++)
    {
        scanf("%d", &input);

        if (input == 0)
        {
            printf("%d\n", Pop());
        }
        else if (input > 0)
        {
            Insert(input);
        }
    }

    return 0;
}

void Insert(const int val)
{
    arr[end] = val;

    int pos = end;

    // until the position gets to the root
    while (pos > 1)
    {
        // compare with parent's value
        if (arr[pos] < arr[pos / 2])
        {
            // swap with parent
            int swap = arr[pos / 2];
            arr[pos / 2] = arr[pos];
            arr[pos] = swap;
        }
        else
        {
            break;
        }

        // ascend to parent's position
        pos /= 2;
    }

    end++;
}

int Pop(void)
{
    // get the value of the root
    int popn = arr[1];

    // move the last node to the root
    arr[1] = arr[end - 1];
    arr[end - 1] = 0;

    int pos = 1;

    if (end <= 2)
    {
        if (end == 2) end--;
        return popn;
    }

    // until the position gets to the end's parent
    while (pos < end / 2)
    {
        int target;

        if (arr[pos * 2 + 1] > 0)
        {
            // compare the descending siblings first
            if (arr[pos * 2] < arr[pos * 2 + 1])
            {
                target = pos * 2;
            }
            else
            {
                target = pos * 2 + 1;
            }
        }
        else
        {
            target = pos * 2;
        }

        // compare with the target
        if (arr[pos] > arr[target])
        {
            // swap with the target
            int swap = arr[target];
            arr[target] = arr[pos];
            arr[pos] = swap;
        }
        else
        {
            break;
        }

        pos = target;
    }

    end--;

    return popn;
}