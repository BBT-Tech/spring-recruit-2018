(function () {
  var error = {
    name: document.getElementById('errorName'),
    sex: document.getElementById('errorSex'),
    grade: document.getElementById('errorGrade'),
    college: document.getElementById('errorCollege'),
    dorm: document.getElementById('errorDorm'),
    telephone: document.getElementById('errorTelephone'),
    department_1: document.getElementById('errorDepartment1'),
    adjust: document.getElementById('errorAdjust')
  }
  var dom = {
    name: document.getElementById('name'),
    sex: document.getElementsByName('sex'),
    grade: document.getElementsByName('grade'),
    college: document.getElementById('college'),
    dorm: document.getElementById('dorm'),
    telephone: document.getElementById('telephone'),
    department_1: document.getElementById('department1'),
    department_2: document.getElementById('department2'),
    adjust: document.getElementsByName('adjust'),
    introduction: document.getElementById('introduction')
  }

  var getRadio = function (dom) {
    for (var i = 0; i < dom.length; i++) {
      if (dom[i].checked === true) {
        return dom[i].value;
      }
    }
    return null;
  }

  var data = {
    name: function () {
      return dom.name.value;
    },
    sex: function () {
      return getRadio(dom.sex);
    },
    grade: function () {
      return getRadio(dom.grade);
    },
    college: function () {
      return dom.college.value;
    },
    dorm: function () {
      return dom.dorm.value;
    },
    telephone: function () {
      return dom.telephone.value;
    },
    department_1: function () {
      return dom.department_1.value;
    },
    department_2: function () {
      return dom.department_2.value;
    },
    adjust: function () {
      return getRadio(dom.adjust);
    },
    introduction: function () {
      return dom.introduction.value;
    }
  }

  var checker = {
    name: function () {
      if (data.name() === '') {
        error.name.classList.add('show');
        return false;
      } else {
        error.name.classList.remove('show');
        return true;
      }
    },
    sex: function () {
      if (data.sex() === null) {
        error.sex.classList.add('show');
        return false;
      } else {
        error.sex.classList.remove('show');
        return true;
      }
    },
    grade: function () {
      if (data.grade() === null) {
        error.grade.classList.add('show');
        return false;
      } else {
        error.grade.classList.remove('show');
        return true;
      }
    },
    college: function () {
      if (data.college() === '') {
        error.college.classList.add('show');
        return false;
      } else {
        error.college.classList.remove('show');
        return true;
      }
    },
    dorm: function () {
      if (data.dorm() === '' || !(/^ *(C|c)([1-9]|1[0-9]) *(东|西)? *-? *[1-9][0-9]{2} *$/.test(data.dorm()))) {
        error.dorm.classList.add('show');
        return false;
      } else {
        error.dorm.classList.remove('show');
        return true;
      }
    },
    telephone: function () {
      if (data.telephone() === '' || !(/^1[34578]\d{9}$/.test(data.telephone()))) {
        error.telephone.classList.add('show');
        return false;
      } else {
        error.telephone.classList.remove('show');
        return true;
      }
    },
    department_1: function () {
      if (data.department_1() === '') {
        error.department_1.classList.add('show');
        return false;
      } else {
        error.department_1.classList.remove('show');
        return true;
      }
    },
    adjust: function () {
      if (data.adjust() === null) {
        error.adjust.classList.add('show');
        return false;
      } else {
        error.adjust.classList.remove('show');
        return true;
      }
    },
  }

  // bind error checking
  for (var key in error) {
    if (error.hasOwnProperty(key) && key !== 'sex' && key !== 'grade' && key !== 'adjust') {
      dom[key].addEventListener('blur', checker[key]);
    }
  }

  var radioTracker = function (dom, listener) {
    for (var i = 0; i < dom.length; i++) {
      dom[i].addEventListener('click', listener);
    }
  }

  radioTracker(dom.sex, checker.sex);
  radioTracker(dom.grade, checker.grade);
  radioTracker(dom.adjust, checker.adjust);

  document.getElementById('submitButton').addEventListener('click', function () {
    var errorStatus = false;
    for (var key in error) {
      if (error.hasOwnProperty(key)) {
        if (!checker[key]()) {
          errorStatus = true;
        }
      }
    }
    if (errorStatus) {
      return;
    } else {
      post('/2018/bbt_recruit/backend/register.php', {
        name: data.name(),
        sex: data.sex(),
        grade: data.grade(),
        college: data.college(),
        dorm: data.dorm(),
        telephone: data.telephone(),
        department1: data.department_1(),
        department2: data.department_2() === '' ? '无' : data.department_2(),
        adjust: data.adjust(),
        textarea: data.introduction(),
      }, false, function (data) {
        var obj = JSON.parse(data);
        if (obj.status === 0) {
          alert("报名成功！");
          window.location.href = "./success.html";
        } else {
          alert(obj.msg);
        }
      }, function () {
        alert('网络故障');
      })
    }
  })

})();
