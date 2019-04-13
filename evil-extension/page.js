const MATCH_LIST = {
  'there': 'their',
  'their': 'there',
  'they\'re': 'there',
  'There': 'Their',
  'Their': 'There',
  'They\'re': 'There',
  'THERE': 'THEIR',
  'THEIR': 'THERE',
  'THEY\'RE': 'THERE'
};


function transformTextNodes(node) {
  // TODO(you): Implement this function! See HW spec for details.
    let text=[];
    let flag=0;
    if(node.nodeType == Node.TEXT_NODE){
        console.log('text:' + node.textContent);
        for(let i in node.textContent.split(" ")){
            for(var match of Object.keys(MATCH_LIST)){
                if(node.textContent.split(" ")[i]== match+"\n" ||node.textContent.split(" ")[i]== match  ){
                    flag=1;
                    break;
                }
            }
            if(flag===1){
                text = text + MATCH_LIST[match]+' ';
            }
            else {
                text = text + node.textContent.split(" ")[i]+' ';
            }
            flag=0;

        }
        console.log("unchange"+ node.textContent);
        console.log("changed "+text);
        node.textContent=text;
    }else {
        console.log( node.nodeName);
    }
    for (const child of node.childNodes) {
        if(child==='STYLE' || child==='SCRIPT'){
            return;
        }
        transformTextNodes(child);
    }
}


transformTextNodes(document.body);

// Log statement to test that the extension loaded properly.
console.log('Evil extension loaded!');
console.log('Extension updated');

/*
for(let i in node.textContent.split(" ")){
    for(let match of Object.keys(MATCH_LIST)){
        console.log("key:"+match+"   value"+MATCH_LIST[match]);
        console.log(typeof match+"   value"+MATCH_LIST[match]);
        console.log("str:"+node.textContent.split(" ")[i]);
        console.log(typeof node.textContent.split(" ")[i]);
        if(node.textContent.split(" ")[i]== match+"\n" ){
            console.log("+++++");
            node.textContent.split(" ")[i]=MATCH_LIST[match];
            break;
        }
    }
    text = text + node.textContent.split(" ")[i]+' ';
}
console.log(text);
node.textContent=text;*/
