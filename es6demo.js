let arr = []
for(let i = 0; i<10;i++){
  arr[i] = () => console.log(i)
}
arr[6]()
