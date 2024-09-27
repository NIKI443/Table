const clicks = document.getElementsByClassName("container_table__rows");
const schedule = '<div id="schedule"></div>';
let arr = [];
let arrMain = [];

for (let i = 1; i < clicks.length; i++) {
  let procentCellItem = Number(
    String(
      clicks[i].children[2].children[0].childNodes[0].textContent
        .split("%")
        .join("")
    )
  );
  let dayofWeek = Number(
    String(clicks[i].children[3].childNodes[0].textContent.split(" ").join(""))
  );

  if (procentCellItem > 0) {
    clicks[i].children[2].className += " green";
  } else if (procentCellItem < 0) {
    clicks[i].children[2].className += " red";
    clicks[i].children[2].children[0].className += " red";
  }
  if (dayofWeek < 1000 && dayofWeek != 34) {
    clicks[i].children[3].className += " green";
  } else if (dayofWeek > 1000000) {
    clicks[i].children[3].className += " red";
  }

  clicks[i].addEventListener("click", function () {
    const existingSchedule = document.getElementById("schedule");
    if (existingSchedule) {
      existingSchedule.remove();
    }

    clicks[i].insertAdjacentHTML("afterend", schedule);

    for (let j = 1; j < clicks[i].children.length; j++) {
      arr.push(clicks[i].children[j].childNodes[0].textContent);
      if (arr.length >= 4) {
        arr.splice(0, 1);
      }
    }

    for (let q = 0; q < arr.length; q++) {
      arrMain.push(arr[q].replace(/\s+/g, ""));
      if (arrMain.length >= 4) {
        arrMain.splice(0, 1);
      }
    }

    let elem1 = Number(arrMain[0]);
    let elem2 = Number(arrMain[1]);
    let elem3 = Number(arrMain[2]);

    Highcharts.chart("schedule", {
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "middle",
      },

      xAxis: {
        categories: ["Текущий день", "Вчера", "Этот день недели"],
      },

      series: [
        {
          name: "",
          data: [elem1, elem2, elem3],
          color: "green",
        },
      ],

      title: {
        text: "",
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    });
  });
}
