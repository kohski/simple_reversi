arr = [[0,0,1],[1,-1,0],[-1,-1,0]]

list = arr.reduce((acc,cur) => {
  acc.push(...cur);
  return acc
})

ans = list.filter(elm => elm === 1).length
ans