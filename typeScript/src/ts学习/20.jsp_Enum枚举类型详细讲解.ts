(() => {
  // 通俗来说，枚举就是一个对象的所有可能取值的集合。

  enum Sex {
    male,
    female,
  }

  console.log(Sex); // { '0': 'male', '1': 'female', male: 0, female: 1 }

  enum Job {
    waiter = 1,
    Teacher = "老师",
    Teacher2 = 2, // 当上一个不是数字时，enum不能默认赋值
    Teacher3,
  }

  console.log(Job);
  /**
    {
      '1': 'waiter',
      '2': 'Teacher2',
      '3': 'Teacher3',
      waiter: 1,
      Teacher: '我是',
      Teacher2: 2,
      Teacher3: 3
    }
   */
})();
