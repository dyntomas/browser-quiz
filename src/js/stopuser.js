export default () => {
    $('body').on('dragstart drop contextmenu', function(e){
        e.preventDefault();
        return false;
    });
}
