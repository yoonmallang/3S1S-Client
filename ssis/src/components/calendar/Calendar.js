var today = null;
var year = null;
var month = null;
var firstDay = null;
var lastDay = null;
var $tdDay = null;
var $tdSche = null;
var jsonData = [];
var inputlist = [];

var selectResult = null;

//전체 set 
$(document).ready(function() {
   drawCalendar();
   initDate(); 
   drawDays();

   //cal-day
   $(".cal-day").on("click", function() {
      viewCalendar_edit(this);
      //showData();
   })
});

 $("#movePrevMonth").on("click", function() { movePrevMonth(); });
 $("#moveNextMonth").on("click", function() { moveNextMonth(); });

function showData(showDateText) {
   // 사용자가 선택한 날짜 데이터 베이스에 저장
   let year = document.getElementById("cal_top_year").innerText;
   let month = document.getElementById("cal_top_month").innerText;
   //let date = document.getElementById("show_date").innerText;
   let date = showDateText

   if (date.length === 1) date = '0' + date;
   let clickDate = year + '-' + month + '-' + date;
   $('input[name=writtenDate]').attr('value', clickDate);

   for (let i = 0; i < jsonData.length; i++) {
        if (jsonData[i].day == Number(date)) {
            document.getElementById("deletesubmit").style = "display:block";
            document.getElementById("editsubmit").style = "display:block";		
        }
    }

   var Parms = '?date=' + clickDate;
   document.getElementById("image_container").setAttribute("src", "/TEST/upload/noimage.png");

   $.ajax({
      contentType: "application/json; charset=UTF-8",
      type: "post",
      url: '/TEST/UserRecordSelect' + Parms,
      dataType: "json",
	  async : false,
      success: function(resp) {
		console.log("NO DATA");
		selectResult = "NO DATA";		
		
      },
      error: function searchError(xhr, err) {
         // console.error("Error on ajax call: " + err);
         console.log(JSON.stringify(xhr));
         let responseResult = JSON.parse(JSON.stringify(xhr)).responseText;

         var firstresult = responseResult.split(", ");
         var secondresult = [];
         firstresult.forEach(((value, index) => {
            secondresult.push(value.split("=")[1]);
         }))

         console.log(secondresult);
         // console.log(typeof responseResult);
         const imageUrl = secondresult[2];
         console.log(typeof imageUrl);
         console.log(imageUrl);
         
         if(imageUrl==="null"){
            document.getElementById("image_container").setAttribute("src", "/TEST/upload/noimage.png");
         }else{
            document.getElementById("image_container").setAttribute("src", "/TEST/upload/" + imageUrl);
         }


         const exerciseType = secondresult[1];
         console.log(typeof exerciseType);
         $('input[name=exerciseContent]').attr('value', secondresult[3].split("}")[0]);
         
         $("#exerciseType").val(exerciseType).prop("selected", true);
         
         $('input[name=exerciseMemo]').attr('value', secondresult[0]);

      }
   });

}

//calendar 그리기
function drawCalendar() {
   var setTableHTML = "";
   setTableHTML += '<table id = "table" class="calendar">';
   setTableHTML += '<tr><th>SUN</th><th>MON</th><th>TUE</th><th>WED</th><th>THU</th><th>FRI</th><th>SAT</th></tr>';
   for (var i = 0; i < 6; i++) {
      //행 6개 만드는 부분
      setTableHTML += '<tr height="105px">';
      for (var j = 0; j < 7; j++) {
         //열 7개(월 ~ 일)만들면서 날짜 채워나가는 부분 
         setTableHTML += '<td name="item" style="text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">';
         setTableHTML += '    <div class="cal-day" name="cal-day"></div>';
         setTableHTML += '    <div class="cal-schedule" name="cal-schedule" style="text-align: center; font-family:\'Chalkboard SE\'; font-weight: bold"></div>';
         setTableHTML += '</td>';
      }
      setTableHTML += '</tr>';
   }
   setTableHTML += '</table>';
   $("#cal_tab").html(setTableHTML);
}

//날짜 초기화
function initDate() {
   $tdDay = $("td div.cal-day")
   $tdSche = $("td div.cal-schedule")
   dayCount = 0;
   today = new Date();
   year = today.getFullYear();
   month = today.getMonth() + 1;
   firstDay = new Date(year, month - 1, 1);
   lastDay = new Date(year, month, 0);
}

//calendar 날짜표시
function drawDays() {
   var date = new Date();
   var day = ("0" + date.getDate()).slice(-2);
   $("#cal_top_year").text(year);
   $("#cal_top_month").text(month);
   for (var i = firstDay.getDay(); i < firstDay.getDay() + lastDay.getDate(); i++) {
      $tdDay.eq(i).text(++dayCount);
      $tdDay.eq(i).css("font-size", "15px");
   }
   for (var i = 0; i < 42; i += 7) {
      $tdDay.eq(i).css("color", "red");
   }
   for (var i = 6; i < 42; i += 7) {
      $tdDay.eq(i).css("color", "blue");
   }
   markToday();
   setData();
}


// 오늘 날짜 표시 + 날짜 없는 날 X
function markToday() {
   today = new Date();
   let today_year = today.getFullYear();
   let today_month = ("0" + (today.getMonth() + 1)).slice(-2);
   let today_day = ("0" + today.getDate()).slice(-2);

   let year = document.getElementById("cal_top_year").innerText;
   let month = document.getElementById("cal_top_month").innerText;
   let calday = document.getElementsByName("cal-day");
   let calschedule = document.getElementsByName("cal-schedule");

   let item = document.getElementsByName("item");
   for (let i = 0; i < calday.length; i++) {
      if (today_year == year && today_month == month && today_day == calday[i].innerText) {
         item[i].style = "background:#F2F5A9;";
         item[i].addEventListener('mouseover', (e) => {
            item[i].style = "background:pink;"
         });
         item[i].addEventListener('mouseout', (e) => {
            item[i].style = "background:#F2F5A9;"
         });
         calschedule[i].innerText = "TODAY";
      }
      else if (calday[i].innerText === "") {
         item[i].style = "text-overflow:ellipsis; overflow:hidden; white-space:nowrap; pointer-events:none; background:white;";
         calschedule[i].innerText = "";
      }
      else {
         item[i].style = "text-overflow:ellipsis; overflow:hidden; white-space:nowrap; pointer-events:auto;";
         calschedule[i].innerText = "";
      }
   }
}

//calendar 월 이동
//이전 월로 이동
function movePrevMonth() {
   month--;
   if (month <= 0) {
      month = 12;
      year--;
   }
   if (month < 10) {
      month = String("0" + month);
   }
   getNewInfo();
}

//다음 월로 이동
function moveNextMonth() {
   month++;
   if (month > 12) {
      month = 1;
      year++;
   }
   if (month < 10) {
      month = String("0" + month);
   }
   getNewInfo();
}

//새로운 월일 때
function getNewInfo() {
   for (var i = 0; i < 42; i++) {
      $tdDay.eq(i).text("");
   }
   dayCount = 0;
   firstDay = new Date(year, month - 1, 1);
   lastDay = new Date(year, month, 0);
   drawDays();
}


//데이터 등록 (스케줄)
//유저아이디, 년-월
function setData() {
   let year = document.getElementById("cal_top_year").innerText;
   let month = document.getElementById("cal_top_month").innerText;
   let calday = document.getElementsByName("cal-day");
   let calschedule = document.getElementsByName("cal-schedule");
   var type = ['running', 'weight', 'swim'];
   var Emoji = ['🏃', '🏋️', '🏊'];

   var Parms = '?userID=' + document.getElementById('userID').innerText
      + '&date=' + document.getElementById("cal_top_year").innerText + '-' + document.getElementById("cal_top_month").innerText;

   //var Parms = "?userID="+document.getElementById("userID").innerText;

   $.ajax({
      contentType: "application/json; charset=UTF-8",
      type: "post",
      url: '/TEST/UserCalendarSelect' + Parms,
      dataType: "json",
      async: "false",
      success: function(resp) {
      },
      error: function searchError(xhr, err) {
         let responseResult = JSON.parse(JSON.stringify(xhr)).responseText.slice(0, -1);

         var firstresult = responseResult.split(", ");
         var secondresult = [];
         firstresult.forEach(((value, index) => {
            secondresult.push(value.split("=")[1]);
         }))

         for (let i = 0; i < secondresult.length; i++) {
            var thirdresult = secondresult[i].split(";");
            var input_day = thirdresult[1].substr(8, 2);
            if (input_day[0] == "0") input_day = input_day.substr(1, 1);
            jsonData.push(
               {
                  "year": document.getElementById("cal_top_year").innerText,
                  "month": document.getElementById("cal_top_month").innerText,
                  "day": input_day,
                  "data": Emoji[type.indexOf(thirdresult[3])]
               }
            );
         }
      
         for (let i = 0; i < jsonData.length; i++) {
            if (jsonData[i].year == year && jsonData[i].month == month) {
               for (let j = 0; j < calday.length; j++) {
                  if (calday[j].innerText == jsonData[i].day) {
                     calschedule[j].innerText = jsonData[i].data;
                     calschedule[j].style = "text-align:right; margin-right:10%; font-size: 25px;";
                  }
               }
            }
         }
      }
   });

}


function viewCalendar_edit(str) {
	
	showData(str.innerText);
	console.log("check")
	if(selectResult === "NO DATA"){
		console.log("no data")
		$("#NoRecord").show();
  	
	}else {
		console.log("yes data")
		 if ($('#divToggle').css("display") === "none") {
        	$("#divToggle").show(() => {
            inputlist = [];
        });
   }
	}

   //var day = $tdDay.text();
   $("#show_date").text(str.innerText);

   var shownDate = Number(str.innerText);


   // 이전 월로 이동하기
   document.getElementById("movePrevDay").addEventListener("click", function() {
      if (shownDate == 1) {
         switch (month) {
            case 2: case 4: case 6: case 9: case 11:
               movePrevMonth();
               shownDate = 31;
               $("#show_date").text(shownDate);
               break;
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
               movePrevMonth();
               shownDate = 30;
               $("#show_date").text(shownDate);
               break;
         }
      } else {
         shownDate = shownDate - 1;
         $("#show_date").text(shownDate);
      }
      $('input[name=exerciseContent]').attr('value', "");
      $("#exerciseType").val("none").prop("selected", true);
      $('input[name=exerciseMemo]').attr('value', "");
		console.log(document.getElementById("show_date").innerText);
		
      showData(document.getElementById("show_date").innerText);
   })

   // 다음 월로 이동하기
   document.getElementById("moveNextDay").addEventListener("click", function() {
      if (shownDate == 30) {
         switch (month) {
            case 2: case 4: case 6: case 9: case 11:
               //moveNextMonth();
               shownDate = 1
               $("#show_date").text(shownDate);
               break;
         }
      } else if (shownDate == 31) {
         switch (month) {
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
               //moveNextMonth();
               shownDate = 1;
               $("#show_date").text(shownDate);
               break;
         }
      } else {
         shownDate = shownDate + 1; // 1일로 처음 들어왔을 때 shownDate는 문자라서 +1 하면 11이라고 나오는 문제
         $("#show_date").text(shownDate);
      }
      $('input[name=exerciseContent]').attr('value', "");
      $("#exerciseType").val("none").prop("selected", true);
      $('input[name=exerciseMemo]').attr('value', "");
      showData(document.getElementById("show_date").innerText);
   })
}

// 사용자가 폼 다 입력했는지 체크
function checkAll(input) {
    if(!inputlist.includes(input)) {
        inputlist.push(input);
    }
    if (inputlist.length == 4 && document.getElementById("exerciseType").value != "none") {
        document.getElementById("submit").style = "display:block";
    }
}


// 글 수정 (userID, writtenDate)
$("#editsubmit").on("click", function () {
	console.log("edit clicked");
    let userID = document.getElementById('userID').innerText;

    let year = document.getElementById("cal_top_year").innerText;
    let month = document.getElementById("cal_top_month").innerText;
    let date = document.getElementById("show_date").innerText;
    if (date.length === 1) date = '0' + date;
    let clickDate = year + '-' + month + '-' + date;

    let exerciseType = document.getElementById("exerciseType").value;
    let exerciseContent = document.getElementsByName("exerciseContent")[0].value;
    let exerciseMemo = document.getElementsByName("exerciseMemo")[0].value;
	let imageUrl = document.getElementById("image_container").getAttribute("src");
	
	console.log(imageUrl);

    var Parms = '?userID=' + userID + '&writtenDate=' + clickDate 
              + '&exerciseType=' + exerciseType + '&exerciseContent=' + exerciseContent + '&exerciseMemo=' + exerciseMemo + '&imageUrl=' + imageUrl;
    
    $.ajax({
        contentType: "application/json; charset=UTF-8",
        type: "post",
        url: '/TEST/UserRecordUpdate' + Parms,
        dataType: "json",
        async: "false",
        success: function(resp) {
            console.log(resp);
        },
        error: function searchError(xhr, err) {
            console.log(JSON.stringify(xhr));
			alert("Completed Updating");
			
        }
    });

})

// 글 삭제 (userID, writtenDate)
$("#deletesubmit").on("click", function () {
    let year = document.getElementById("cal_top_year").innerText;
    let month = document.getElementById("cal_top_month").innerText;
    let date = document.getElementById("show_date").innerText;

    if (date.length === 1) date = '0' + date;
    let clickDate = year + '-' + month + '-' + date;

    var Parms = '?userID=' + document.getElementById('userID').innerText + '&writtenDate=' + clickDate;

    $.ajax({
        contentType: "application/json; charset=UTF-8",
        type: "post",
        url: '/TEST/UserRecordDelete' + Parms,
        dataType: "json",
        async: "false",
        success: function(resp) {
			//console.log(resp);
        },
        error: function searchError(xhr, err) {
			console.log(JSON.stringify(xhr));
			alert("Completed Deleting");
			location.href="calendar.jsp";
        }
    });
})
