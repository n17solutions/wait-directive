# N17 Wait

## Angular Directive

Show an animated spinner to show a procedure is processing however the user needs to wait

### Installation

**Bower**

`bower install --save n17wait`

**GitHub**

https://github.com/n17solutions/wait-directive.git

The usable files are housed in the **dist** folder

### Compatibility

N17 Tooltip requires:
* AngularJS

If you are already using these frameworks in your project, you should use the files from the **no-frameworks** folder. We have also included a full bundle in the **inc-frameworks** folder. 

If using the **inc-frameworks** source, you will need to bootstrap an AngularJS App around all N17 Wait Directives on the page. For Example:

```html
<div ng-app="n17-wait">
	<n17-atomic-core>
		...
```

If using AngularJS in your app already, you will need to add N17 Wait as a dependency of your app. For Example:
```javascript
var app = angular.module('myapp', ['n17-wait']);
```

### Usage

```html
<n17-atomic-core></n17-atomic-core>
```

#### This will result in a wait animation resembling
![Wait screenshot]
(http://i.imgur.com/4FyIcKe.png)