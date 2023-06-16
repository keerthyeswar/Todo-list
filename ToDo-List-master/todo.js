
checkEmptyTodo();
$('h1 i').on('click', function(){
    $('#inputContainer').slideToggle(700);
    $(this).fadeOut(500, function(){
        $(this).toggleClass("fas fa-plus-square fas fa-chevron-circle-up");
        $(this).fadeIn(100);
    })
})
$('#noList').on('click', function(){
    $('h1 i').click();
})

function checkEmptyTodo (noTodo = true){
    if(noTodo){
        $('#noList').fadeIn(700, function(){
            $('#noList').css({display: 'inline-block'});
        })
    }
    else {
        $('#noList').fadeOut(700, function(){
            $('#noList').css({display: 'none'});
        })
    }
}
var isCliked = false;

$('#inputContainer').hover(
    function(){  
        $(this).css('box-shadow', '4px 4px 15px #00868b');
    },
    function(){  
        if(!isCliked){
            $(this).css('box-shadow', 'none');
        }
    }
)

$('#inputContainer input').on('click', function(event){  
    isCliked = true;
    $('#inputContainer').css('box-shadow', '4px 4px 15px #00868b');
    event.stopPropagation();
})

$('body').on('click', function(){ 
    if(isCliked){
        isCliked = false;
        $('#inputContainer').css('box-shadow', 'none');
    }
})
$('#inputContainer button').on('click', addNewTodo);   

$('#inputContainer input').on('keyup', function(event){  
    var text = $(this).val();
    if(text.length>0){ 
        show_AddTodoButton();
        if(event.which == 13){  
            addNewTodo();
        }
    }
    else{
        hide_AddTodoButton();
    }
})

function show_AddTodoButton(){
    $('#inputContainer input').css('width', '85%');
    $('#inputContainer button').fadeIn(500).css({width: '15%', display: 'inline-block'});
}

function hide_AddTodoButton(_callback){  
    $('#inputContainer button').fadeOut(500, function(){
        $(this).css({display: 'none'});
        $('#inputContainer input').css('width', '100%');
        if(_callback != undefined){  
            _callback();
        }
    })
}

function addNewTodo(){  
    var inp =   "<li>"                                 +
                    "<input type='checkbox'>"          +
                    "<span></span>"                    +
                    "<input type='text'>"              +
                    "<button>Cancel</button>"          +
                    "<i class='fas fa-trash-alt'></i>" +
                    "<i class='fas fa-edit'></i>"      +
                "</li>";

    $('#ulTodo').append(inp);
    $('#ulTodo li:last-child span').text( $('#inputContainer input').val() );

    checkEmptyTodo($('#ulTodo li').length == 0);
    
    $('#ulTodo li:last-child').css({display: 'none'}).fadeIn(1200);
    $('#inputContainer input').toggleClass('ji');
    $('#inputContainer input').val('').blur().prop('disabled', true);
    $('#inputContainer button').prop('disabled', true);
    $('#ulTodo li i').prop('disabled', true);
    $('#inputContainer button i').toggleClass('fa-check-square fa-check').css({fontSize: '135%', fontWeight: 'bolder'});
    
    doneMessage('New ToDo is added', function(){
        $('#inputContainer').css('box-shadow', 'none');
        $('#inputContainer input').toggleClass('ji');
        hide_AddTodoButton(function(){
            $('#inputContainer input').prop('disabled', false);
            $('#inputContainer button').prop('disabled', false);
            $('#ulTodo li i').prop('disabled', false);
            $('#inputContainer button i').toggleClass('fa-check fa-check-square').css({fontSize: '100%', fontWeight: 'bold'});;
        })
    })

    addScrollBar();

}

function doneMessage(msg, _callback){  
    $('body').toggleClass('ji');
    $('#message p').text(msg);
    $('#message p').addClass('doneMessage').slideToggle(700, function(){
        $(this).delay(800).slideToggle(700, function(){
            $(this).removeClass('doneMessage').text('');
            $('body').toggleClass('ji');
            if(_callback != undefined){
                _callback();
            }
        })
    })
} 

function addScrollBar(){
    if( $('#ulTodo li').length >= 6 ){  
        $('#ulTodo').addClass('scrolBar');
    }
    else{
        $('#ulTodo').removeClass('scrolBar');
    }
}
$('#ulTodo').on('click', 'li span', function(){
    $(this).toggleClass('completedTodo');
    if($(this).siblings("input[type='checkbox']").prop('checked') == true){  // span and checkbox are siblings. So here checkbox is selected by selecting span and traversing to checkbox using siblings()
        $(this).siblings("input[type='checkbox']").prop('checked', false);
    }
    else{
        $(this).siblings("input[type='checkbox']").prop('checked', true);
    }
})

$('#ulTodo').on('click', "li input[type='checkbox']", function(){
    $(this).siblings("span").toggleClass('completedTodo'); 
})
$('#ulTodo').on('click', 'li i:nth-last-child(2)', function(){
    $('#inputContainer input').prop('disabled', true);
    $('#ulTodo li i').prop('disabled', true);
    $(this).parent().fadeOut(700, function(){
        $(this).remove();
        addScrollBar();
        checkEmptyTodo($('#ulTodo li').length == 0);
    })
    doneMessage('Todo is deleted', function(){
        $('#inputContainer input').prop('disabled', false);
        $('#ulTodo li i').prop('disabled', false);
    })
})
var isEditOn = false;
var _this = undefined;
$('#ulTodo').on('click', 'li i:nth-last-child(1)', function(event){
    isEditOn = true;
    $('#inputContainer input').prop('disabled', true);
    $('#ulTodo li i').prop('disabled', true);
    $(this).parent().toggleClass('boxShadow').css({border: "3px solid rgb(60, 60, 235)"});
    $(this).siblings("button").css({display: 'inline-block', width: '21%', opacity: '1.0'});
    $(this).siblings("input[type='text']").css({display: 'inline-block', width: '79%', opacity: '1.0'}).focus().val($(this).siblings("span").text());
    $(this).siblings("input[type='checkbox']").remove();
    $(this).siblings("span").css({display: 'none'});
    $(this).siblings("i").remove();
    _this = $(this).siblings("button");  
    $(this).remove(); 
    event.stopPropagation();  
})

$('#ulTodo').on("keyup", "li input[type='text']", function(event){
    if($(this).val() == $(this).siblings('span').text()){
        $(this).siblings("button").text('Cancel');
    }
    else{
        $(this).siblings("button").text('Update');
    }

    if(event.which == 13) {
        $(this).siblings("button").click();
    }
})

$('#ulTodo').on("click", "li input[type='text']", function(event){
    event.stopPropagation();
})

$('#ulTodo').on('click', 'li button', function(event){
    isEditOn = false;
    $(this).parent().toggleClass('boxShadow').css({border: "none"});
    var inp = "<input type='checkbox'>";
    $(this).parent().prepend(inp);
    $(this).siblings("span").css({display: 'inline-block'});
    var inp = "<i class='fas fa-trash-alt'></i>" +
              "<i class='fas fa-edit'></i>";
    $(this).parent().append(inp);
    $(this).siblings("input[type='text']").css({display: 'none', width: '0', opacity: '0'});
    $(this).css({display: 'none', width: '0', opacity: '0'});
    if($(this).text() == 'Update'){
        $(this).siblings("span").text($(this).siblings("input[type='text']").val()).removeClass('completedTodo');
        $(this).text('Cancel');
        doneMessage('ToDo is updated');
    }
    $('#inputContainer input').prop('disabled', false);
    $('#ulTodo li i').prop('disabled', false);
    event.stopPropagation(); 
})
    $('body').on('click', function(){
        if(isEditOn){
            _this.text('Cancel'); 
            _this.click();
        }
    })