$(function (){
	var editor = ace.edit("editor");
    editor.setOptions({
        useWrapMode: true,
        highlightActiveLine: true,
        showPrintMargin: false,
        theme: 'ace/theme/tomorrow_night',
        mode: 'ace/mode/javascript'
    })
    editor.getValue(); // or session.getValue  //to get content
   

})