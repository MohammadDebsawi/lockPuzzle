const sadsfdsf = [
  {
    nums: [6, 8, 1],
    isFixed: true,
    Pos: true,
  },
  {
    nums: [6, 4, 5],
    isFixed: true,
    Pos: false,
  },
  {
    nums: [1, 2, 6],
    isFixed: true,
    Pos: false,
  },
  {
    nums: [7, 3, 8],
    isFixed: false,
    Pos: false,
  },
  {
    nums: [7, 8, 2],
    isFixed: true,
    Pos: false,
  },
];

function processPuzzle(puzzleData) {
  let possibilities = [];
  puzzleData.forEach((entry) => {
    entry.nums.forEach((num, i) => {
      if (!possibilities[num])
        possibilities[num] = {
          isTrue: true,
          pos: [],
          notPos: [],
        };
      if (possibilities[num].isTrue !== false)
        possibilities[num].isTrue = entry.isFixed;
      if (entry.Pos && !possibilities[num].pos.includes(i)) possibilities[num].pos.push(i);
      else if (!possibilities[num].notPos.includes(i)) possibilities[num].notPos.push(i);
    });
  });
  let solv = ["_", "_", "_"];
  possibilities.forEach((possibilitie, i) => {
    if (possibilitie.isTrue) {
      if (!matchValue(possibilitie.pos, possibilitie.notPos)) {
        if (possibilitie.pos.length === 1) {
          solv[possibilitie.pos[0]] = i;
        } else if (possibilitie.notPos.length === 2) {
          if (!possibilitie.notPos.includes(0)) solv[0] = i;
          else if (!possibilitie.notPos.includes(1)) solv[1] = i;
          else if (!possibilitie.notPos.includes(2)) solv[2] = i;
        } else {
          const p = [];
          if (possibilitie.notPos[0] === 0) p.push(1, 2);
          else if (possibilitie.notPos[0] === 1) p.push(0, 2);
          else if (possibilitie.notPos[0] === 2) p.push(0, 1);
          p.forEach((z) => {
            if (solv[z] === "_") solv[z] = i;
          });
        }
      }
    }
  });
  alert(`${solv[0]}${solv[1]}${solv[2]}`);
}

function matchValue(pos, notPos) {
  return pos.some((p) => notPos.includes(p));
}

const condtions = document.getElementById("condtions");
const add = document.getElementById("add");
const solv = document.getElementById("solv");

let con = 0;

function newCondtion() {
  const condtion = document.createElement('div');
  condtion.classList.add("condtion", "d-flex", "p-2", "align-items-center");
  condtion.id = `a${con}`;
  condtion.innerHTML = `
        <input type="text" name="" id="a" />
      <input type="text" name="" id="b" />
      <input type="text" name="" id="c" />
      <label for="">عدد الاعداد الصحيحة</label>
      <input type="text" name="" id="d" />
      <select class="form-select" name="" id="e">
        <option value="false">جميعها في المكان الخطأ</option>
        <option value="true">جميعها في المكان الصحيح</option>
      </select>
      <button onclick="removed('a${con}')" class="btn btn-danger">حذف</button>
  `;
  condtions.appendChild(condtion);
  con++;
}

function removed(id) {
  document.getElementById(id).remove();
}

add.addEventListener("click", () => {
  newCondtion();
});

newCondtion();

function getValues() {
  const condtion = [...document.querySelectorAll(".condtion")];
  const puzzleData = [];
  condtion.forEach((cond) => {
    const a = cond.querySelector("#a");
    const b = cond.querySelector("#b");
    const c = cond.querySelector("#c");
    const d = cond.querySelector("#d");
    const e = cond.querySelector("#e");
    const nums = [c.value, b.value, a.value];
    nums.forEach(num => !num?alert('عليك ملئ جميع الحقول'):null);
    const Pos = e.value === "true" ? true : false;
    const isFixed = parseInt(d.value?d.value:0) > 0 ? true : false;
    puzzleData.push({
      nums: nums,
      isFixed: isFixed,
      Pos: Pos,
    });
  });
  processPuzzle(puzzleData);
}

solv.addEventListener("click", () => {
  getValues();
});

document.onkeydown = (e) => {
  if (e.target.tagName == "INPUT") {
    const inputs = document.getElementsByTagName("input");
    if (e.key == "Enter" || e.key == "ArrowLeft") {
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i] == e.target) {
          if (i == inputs.length - 1) {
            inputs[0].focus();
          } else {
            inputs[i + 1].focus();
          }
          break;
        }
      }
    }else if (e.key == "ArrowRight") {
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i] == e.target) {
          if (i == 0) {
            inputs[inputs.length - 1].focus();
          } else {
            inputs[i - 1].focus();
          }
          break;
        }
      }
    }
  }
};

document.addEventListener('input', (e) => {
  if (e.target.tagName === "INPUT") {
    const value = e.target.value;
    if (!value.match(/^[0-9]$/)) {
      e.target.value = value.slice(0, 1).replace(/[^0-9]/, '');
    }
  }
});

document.getElementById('clear').onclick=(e)=>{
  condtions.innerHTML = '';
  con = 0;
  newCondtion();
}