<%@ page language="java" contentType="text/html;" pageEncoding="UTF-8" %>
<%@ page import="java.util.ArrayList"%>
<%@ page import="java.util.List"%>
<%@ page import="java.sql.*"%>
<%@ page import="java.util.*,java.text.*"%>
<% 
    String userID = (String) session.getAttribute("sessionuserID"); 
%>

<!DOCTYPE html>
<html lang="ko">

<head>
  <meta http-equiv="Content-Type" content="text/html;" />
  <meta charset="UTF-8" /> 
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge, chrome=1" />
  <title>Calendar</title>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
  <script type="text/javascript" src="./static/js/Calendar.js" ></script> 
  
  <style>
  <%@include file="/static/css/navi.css" %>
  <%@include file="/static/css/form.css" %>
  <%@include file="/static/css/Calendar.css" %>
  </style>
</head>

<body>
   <form id="form1" runat="server">
      <div class="wrap">
         <div class="menubar">
            <div class="menuLogo">
               <a href="./main.jsp">Logo</a>
            </div>
            <ul class="menuItem">
				<li><a href="./calender.jsp">Calendar</a>

               <li><a href= #>Community</a>
					<ul>
						<li><a href="bbsNotice.jsp">Notice</a></li>
						<li><a href="bbs.jsp">Board</a></li>
						<li><a href="#">Before & After</a></li>
					</ul></li>
			</ul>

			<div class="logout">
				<a>
					<form action="./userLogout" method="post">
						<!-- <button id="logout">Logout</button> -->
						Logout
					</form>
				</a>
			</div>

			<div class="mypage">
				<a href="info.jsp">My Page</a>
			</div>

		</div>
	</div>
      
   </form>

   <div class="parent_main">
      <%--  <h2 class="date_text" style="text-align: center; padding: 2rem 0">--%>
      <div class="child_main">
         <a href="#" id="movePrevMonth">
         <span id="prevMonth"
            class="cal_tit"
            style="font-size: 40px; font-family: 'Andale Mono'; color: deeppink;">◀︎&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></a>
      </div>
      <div class="child_main">
         <span id="cal_top_month"
            style="font-size: 40px; font-family: 'Andale Mono'; font-weight: bold;"></span>
         <br>
         <%--  <span style="font-size: 40px;">.</span>&nbsp;--%>
         <span id="cal_top_year"
            style="font-size: 20px; font-family: 'Andale Mono';"></span>
      </div>
      <div class="child_main">
         <a href="#" id="moveNextMonth">
         <span id="nextMonth"
            class="cal_tit"
            style="font-size: 40px; font-family: 'Andale Mono'; color: deeppink;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;▶︎</span></a>
      </div>
      <%--  </h2>--%>
   </div>
   

   <div class="largest_box" style="padding: 10px; border: 1px solid #ffe4e1">

      <div class='first rap'
         style="width: 19%; padding-left: 1%; background-color: lightpink">
         <span id="userID"><%=userID %></span>님 안녕하세요! <br> 친구 <br>
         문박히
      </div>

      <div id='cal_tab' class='second rap' style="width: 81%; padding-left: 5px; text-align: center; background-color: white"></div>
      
      
      <div id="NoRecord" class="NoRecord" style="display:none;">
         <div id='close' onclick="closeFun()" class="close"></div>      
      		<div class = "goRecord" style = "text-align: center; margin-top: 25%;">안녕하세요 <%=userID%>님, 이날은 기록된 운동이 없습니다.</div>
      		<input type="button" value="기록하러가기!!" style= "margin-left: 45%;"onclick="displayDivToggle()"></input>
      </div>
      
      
         
      <div id='divToggle' class="divToggle">
      <!--닫기 표시 -->
         <div id='close' onclick="closeFun()" class="close"></div>

         <!-- 상단에 날짜 표시하는 부분-->
         <h2 style="text-align: center; padding: 1rem 0">
            <a href="#" id="movePrevDay"><span id="prevDay">&lt;</span></a> 
            <span id="show_date"></span> <a href="#" id="moveNextDay">
            <span id="nextDay">&gt;</span></a>
         </h2>

         <!-- 이미지 노출되는 부분 하단에 썸네일 함수 사용함-->
         <div class = "image-div" style ="float: left;">
         <img src="" alt="" id="image_container" class="day-photo"/>
         </div>

         <div style = "float: left;">
         <form style = "margin-left: 10%;" action="${pageContext.request.contextPath}/UserRecordInsert" method="post" enctype="multipart/form-data">
            
            <input type="text" id="writtenDate" name="writtenDate" value="" style="display: none;" />

            <!-- 파일  수정  삭제  -->
            <div class="file-wrapper flie-wrapper-area" style= "float:left;">
                  <span class="label-plus"><i class="fas fa-plus"></i></span>
            		<input type="file" name="imageURL" id="imageURL" class="upload-box upload-plus" style = "width: 190px;" onchange="checkAll('img')" accept="image/*">
                  	<div id="preview" style = "float:left;"></div>                  	
            </div>
            <div class="file-edit-icon" style = "float:left;">
<!--                 <input type="submit" value="저장"></input>
 -->                 <a href="#" class="preview-edit">이미지 수정</a> 
                     <a href="#" class="preview-de">이미지 삭제</a>
            </div>

            <!------------------------------------------------------------------------------>

            <div style="padding-top: 10%;">
               <select id="exerciseType" name="exerciseType" onchange="checkAll('type')">
                  <option value="none">= what today?! =</option>
                  <option value="running">running</option>
                  <option value="weight">weight</option>
                  <option value="swim">swim</option>
               </select>
            </div>


            <div style= "padding-top: 6%; font-weight : bold; font-family: 'Chalkboard SE';">
               <label>운동 내용 기록</label><br> <label> 
            <input type="text" onchange="checkAll('content')"
                  name="exerciseContent" class="exerciseContent"
                  placeholder="어떤 운동을 어떻게 했나요?" maxlength="1000" required="required"
                  pattern=".{4,100}" style="width: 450px; height: 180px; border-radius:1%;" />
               </label>
            </div>

            <div style= "padding-top: 4%; font-weight : bold; font-family: 'Chalkboard SE';">
               <label>오늘의 운동평</label> <br> <input type="text"
                  name="exerciseMemo" class="exerciseMemo" onchange="checkAll('memo')"
                  placeholder="오늘의 운동은 어땠나요?" maxlength="1000" required="required"
                  pattern=".{4,100}" style="width: 450px; height: 100px; border-radius:1%;" />
            </div>

            <input type="submit" id="submit" value="등록" class="btn btn-default" style="display:none;"/>
            
            <div class = "record-submit">
              <div id="editsubmit" class="record-edit" >수정</div>
           	  <div id="deletesubmit" class="record-de" >삭제</div>
           	</div>
           	
         </form>
         
         </div>
      </div>


 <script type="text/javascript" src="./static/js/Calendar.js" ></script>   
 <script type="text/javascript">
  function handleFileSelect(event) {
       var input = this;
       console.log(input.files)
       if (input.files && input.files.length) {
           var reader = new FileReader();
           this.enabled = false
           reader.onload = (function (e) {
           console.log(e)
           var image_container = document.getElementById("image_container");
           image_container.setAttribute("src", e.target.result);
           image_container.setAttribute("title", escape(e.target.result));
           });
           reader.readAsDataURL(input.files[0]);
       }
   }
   $('#imageURL').change(handleFileSelect);
   $('.file-edit-icon').on('click', '.preview-de', function () {
       $("#image_container").empty()
       $("#imageURL").val("");
   });
   $('.preview-edit').click( function() {
     $("#imageURL").click();
   } );
   
   
  function closeFun(event) {
       document.getElementById("divToggle").style.display = 'block';
       console.log("called closeFunction");
       location.reload();
     }
  
  
  function displayDivToggle() {
	  $("#divToggle").show();
      
  }
</script>

</body>
</html>