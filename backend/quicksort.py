def partition(l,r,nums):
    pivot, ptr = nums[r],l
    for i in range(l,r):
        if nums[i]<=pivot:
            nums[i],nums[ptr]=nums[ptr],nums[i]
            ptr+=1
    
    nums[ptr],nums[r]=nums[r],nums[ptr]
    return ptr

def quicksort(l,r,nums):
    if len(nums) == 1:
        return nums
    
    if l < r:
        pi = partition(l,r,nums)
        quicksort(l,pi-1,nums)
        quicksort(pi+1,r,nums)
    return nums


arr = [11,2,3,7,41,23,9]
res = quicksort(0,len(arr)-1,arr)
print(res)