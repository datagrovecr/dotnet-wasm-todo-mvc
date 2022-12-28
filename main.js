import { dotnet } from './dotnet.js'
import { $on } from './helpers.js';

let exports;
const onHashchange = () => exports.TodoMVC.MainJS.OnHashchange(document.location.hash);
$on(window, 'hashchange', onHashchange);

const openFile = () => exports.TodoMVC.MainJS.openFile();
const fileTarget = document.getElementsByClassName('todo-getFile');
$on(fileTarget[0], 'input', openFile);

const { getAssemblyExports, getConfig } = await dotnet.create();

exports = await getAssemblyExports(getConfig().mainAssemblyName);

await dotnet.run();

onHashchange();

openFile();