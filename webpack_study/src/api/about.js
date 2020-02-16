// import '@babel/polyfill'
import '../css/about.scss'
console.log('about')
const testFn = (argu) => {
  console.log(argu)
}

async function timeout() {
  await testFn()
  return 'hello world'
}
console.log(timeout());

function * generate () {
  yield 1
}


const log = (val) => {
  console.log(val)
  return val
}

@log
class A  {

}

'aaa'.includes('a')