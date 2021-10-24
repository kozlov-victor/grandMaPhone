let id = 0;
module.exports = function(content) {
    content = content.replace(/<(.|\n)*?>/g,substring => {
        if (substring==='<>') return substring; // ignore fragment node
        if (substring[1]===substring[1].toUpperCase()) return substring; // ignore component node
        if (substring.indexOf('/')>-1) { // self closing tag
            return substring.replace('/',` __id={${id++}}/`);
        }
        return substring.substring(0,substring.length-1) + ` __id={${id++}}>`;
    });
    return content;
}