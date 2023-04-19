# Heap-Sort-Dynamic-Demonstration

基于echart实现的堆排序的本地动态演示网页。

该项目直接clone后打开html即可使用。

灰色区域为正在排序的堆，绿色区域是已经排序好的每次取出的堆顶元素

![image](https://user-images.githubusercontent.com/65942634/233074712-18197c0a-432f-4d6b-87a3-747a94de48dd.png)

## 软件功能

1. 输入一组数字。
2. 可视化该数字对应的堆。
3. 对该组数字进行堆排序，现实从小到大的结果。
4. 对堆排序过程中的每一次调整都进行可视化。
5. 可视化显示堆排序过程中被输出的堆顶元素。
6. 可以反复进行排序。

## 设计思想

堆排序的输入是一份数组，而后依据从上到下，从左到右的顺序将数组的的数字以此放到完全二叉树中，而后进行调整。

其中关键的一步调整为最大堆调整，函数如下：

![image](https://user-images.githubusercontent.com/65942634/233074460-0158897b-462f-4331-8a87-fc8a894020a8.png)

将start作为父节点，然后与左右2个子节点（如果有的话）中的最大值比较，如果父节点更大，那么就结束，而如果子节点更大，那么就交换父节点和该子节点的值，而后将该子节点当做父节点，继续向下看，直到父节点的值大于2个子节点的值或者达到叶子节点。

而后在堆排序的过程中，首先从最后一个非叶子节点开始，对其进行最大堆调整，而后继续往前，直到将前面所有的节点都调整完毕。这样就建立了一个最大堆，最大值在堆顶。而后将这个在堆顶的最大值与数组的最后一个值进行交换，同时将整个数组的需要遍历的长度-1，即将这个最大值排除在了数组之外，再对新交换来的堆顶元素进行最大堆调整，因为调整完后父节点总是大于2个子节点，故调整完毕后最大值还是在堆顶，而后进行同样的交换操作，直到需要遍历的长度为0。这样数组中就是按照从小到大排序的数值了。而为了后续的可视化，我们还记录每一步调整的结果，放入到函数如下：

![image](https://user-images.githubusercontent.com/65942634/233074582-ecf8bf5d-3298-4c49-8138-80703df374e0.png)

## 可视化堆的思路

这里使用的可视化工具为Apache Echarts库中的关系图部分。它可以通过js控制，很方便地在网页中实现可视化。关系图的效果如下：

![image](https://user-images.githubusercontent.com/65942634/233074623-b6022b96-890a-4414-8c0b-b238d2dd1b76.png)

## 操作说明

1.输入节点个数

![image](https://user-images.githubusercontent.com/65942634/233075093-cd9ad63e-bcfe-47a6-8911-084c4eadcd13.png)

2.输入节点数据

![image](https://user-images.githubusercontent.com/65942634/233075143-fa7d408d-092d-4e49-b10f-8faa9de64b7e.png)

3.如果有需要输入每一次动画停留的时间，若不输入则默认2s

![image](https://user-images.githubusercontent.com/65942634/233075188-a7e40d98-9854-4ea4-80be-c6a7294b22d9.png)


4.点击开始排序按钮，进行排序

![image](https://user-images.githubusercontent.com/65942634/233075274-dfe86abe-82aa-4e12-8b61-3fe1d8452ed2.png)

5.观察等待排序结果

![image](https://user-images.githubusercontent.com/65942634/233075348-0f3592f3-acda-4e9b-a5f1-1160541a08c0.png)

![image](https://user-images.githubusercontent.com/65942634/233075439-fa5085fc-a37f-470d-b5b6-eb5c075db7f5.png)

![image](https://user-images.githubusercontent.com/65942634/233075416-10e8e1a8-3354-4a77-83f0-caad70820f66.png)

