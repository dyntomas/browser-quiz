module.exports = () => {
    $('body').on('dragstart drop', function(e){
        e.preventDefault();
        return false;
    });
}