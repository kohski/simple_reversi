arr = [[1,2],[3,4],[5,6]]
src= [1,2]
ans = arr.filter(elm => {
  return elm[0] === src[0] && elm[1] === src[1]
}).length 

ans 