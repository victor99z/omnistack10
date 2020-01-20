module.exports = function parser(string){
    return string.split(',').map( tech => tech.trim());
}