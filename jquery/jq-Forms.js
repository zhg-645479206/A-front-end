/*
 *表单相关处理方法
 */

/**
 *rgb转16进制颜色
 */

;
function RGBToHex(rgb) {
        var regexp = /[0-9]{0,3}/g;      //定义正则表达式字符串
        var re = rgb.match(regexp);		//利用正则表达式去掉多余的部分，将rgb中的数字提取 
        var hexColor = "#";            
        var hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        for (var i = 0; i < re.length; i++) {            //112,112,121
                var r = null, c = re[i], l = c;          
                var hexAr = [];
                while (c > 16) {				//当c大于16的时候
                        r = c % 16;				//0.5625
                        c = (c / 16) >> 0;		//7.5625
                        hexAr.push(hex[r]);        // 123
                }
                hexAr.push(hex[c]);               //666
                if (l < 16 && l != "") {          
                        hexAr.push(0)
                }
                hexColor += hexAr.reverse().join('');
        }
        //alert(hexColor)  
        return hexColor;
}
;

/**
 *获取字符串长度
 */
 
;function getLength(s) { 
	  var l = 0; 
	  var a = s.split(""); 
	  for (var i=0;i<a.length;i++) { 
	  if (a[i].charCodeAt(0)<299) { 
	  l++; 
	  } else { 
	  l+=2; 
	  } 
	  } 
	  return l; 
};

/*
 *验证价格
 */
 
;function checkPrice(el){
	var value=el.val(),
		newValue='';
	for(i=0;i<value.length;i++){
		if((value.charAt(i)=='.'&&i>0)||!isNaN(value.charAt(i))){
			newValue+=value.charAt(i);										
		}
	};
	el.val(newValue);
};

/**
 *验证本站页面和站外页面链接
 */

;function checkURL(value,title,noEmpty){
	var msg='';
	if(!value&&noEmpty){
		msg='链接不能为空';
	}else if(value){
		if(value.indexOf('/')!=0&&value.indexOf('://')<0){
			  msg='站外链接需加://开头，站内链接需以/开头';
		  }else if(value.indexOf('://')>=0&&value.indexOf('.')<0){
			  msg='请输入正确的站外链接地址';
		  }else if(value.indexOf('/')==0&&value!='/'&&value.indexOf('.html')<0){
			  msg='请输入正确的站内链接地址';
		  };
	};
	if(msg&&title){
		msg=title+msg;
	};
   return msg;
};

/*
 *验证链接
 */

;function isURL(value) {
	var strRegex = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
	var re = new RegExp(strRegex);
	return re.test(value);

};

/*
 *验证email
 */

;function isEmail(value) {
	var strRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
	var re = new RegExp(strRegex);
	return re.test(value);

};

/*
 *验证Tel
 */

;function isPhone(value) {
	var strRegex = /^([\+][0-9]{1,3}[ \.\-])?([\(]{1}[0-9]{2,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/;
	var re = new RegExp(strRegex);
	return re.test(value);

};

/*
 *验证字母和数字
 */

;function isLetterNumber(str){
	 var strRegex = /^[0-9a-zA-Z]+$/;
	var re = new RegExp(strRegex);
	return re.test(str);
};

/**
 *设置表单元素默认值
 */

$.fn.placeholder=function(){
		if($.browser&&$.browser.msie&&$.browser.version<10){       
			 return this.each(function(){
				var value=this.value;
				var placeholder=$(this).attr('placeholder');
				var input=this;
				if($(this).data('placeholder')){
					return;
				};
				if(value==''&&placeholder){
					$(this).data('placeholder',placeholder);
					this.value=placeholder;
					if($(this).attr('type')=='password'){
	                    $(this).hide();
						var el=$('<input />');
						$(el).attr({'type':'text','value':placeholder,'class':this.className}).insertAfter($(this));
						$(el).focus(function(){
								$(this).hide();	
								if(this.value==placeholder){
							input.value='';
						};
								$(input).show().focus();
						});
						$(this).blur(function(){
							if(this.value==''){
								$(this).hide();
								el.value=placeholder;
								$(el).show();
							};
						});	
					}else{
						$(this).focus(function(){
						if(this.value==placeholder){
							this.value='';
						}
					});								
					$(this).blur(function(){
							if(this.value==''){
								this.value=placeholder;
							};
							
						});	
					}
				};
										
			});	
		}
};

/*
 *验证全部表单
 */
;function formVerifications(verifications,values,callback){
	var msg='';
	if(typeof verifications=='function'){
		for(name in values){
			msg=verifications(name,values[name]);
			if(msg)return msg;
		};
		if(!msg){
			fireHandler(callback);
		};
	};
	return msg;
};

/**
 *获取表单值
 flag为true时，则过滤空值
 */
 
;function getFormValue(form,flag){
	var data={},
		vals=$(form).serializeArray();
	$.each(vals,function(i,item){
			var name=item['name'],
				value=enToString(item['value']);
			if(!flag||(flag&&value!='')){
				if(!data[name]){
					data[name]=value;
				}else if(typeof data[name]=='string'){
					data[name]=[data[name]];
					data[name].push(value);
				}else{
					data[name].push(value);
				};
			};
	});
	$('input[role="switch"]',form).each(function(){
		var name=$(this).attr('name'),
		    value=0;
		if($(this).prop('checked')){
			value=$(this).val()||1;
		};
		data[name]=value;
	});
	return data;
	
}; 


/**
 *设置表单项值
 */

;
function setInputValue(name, value, container) {

        container = container || $('body');

        if (!$(':input[name="' + name + '"]', container).length)
                return;

        var label = $(':input[name="' + name + '"]', container)[0].tagName.toLowerCase(),
            type = label == 'input' ? $('input[name="' + name + '"]:first', container).attr('type') : label;
		
		if(('textarea,radio,checkbox,select').indexOf(type)<0){
			 $('input[name="' + name + '"]', container).val(value);
			 return;
		};
		
			
        switch (type) {
                
				case 'text':
                        $('input[name="' + name + '"]', container).val(value);
                        break;

                case 'textarea':
                        $('textarea[name="' + name + '"]', container).val(value);
                        break;

                case 'radio':
                        $('input[name="' + name + '"][value="' + value + '"]', container).prop('checked', true);
                        break;

                case 'checkbox':
						if(typeof value=='number'){
							value=[value];
						};
						if(typeof value=='string'){
							value=value.split(',');
						};
						if(value.length){
							$.each(value, function(i, item) {
									$('input[name="' + name + '"][value="' + item + '"]', container).prop('checked', true);
							});
						};
                        break;

                case 'select':

                        $('select[name="' + name + '"] option[value="' + value + '"]', container).attr('selected', true);
                        break;

        }
        ;


}
;


/**
 *设置表单值
 */

;$.fn.setFormValue=function(values,opts){
	
	return this.each(function(){
		
		var $self=$(this);

		//为表单设置值
		for(name in values){
			var value=values[name],
				input=$(':input[name="'+name+'"]:first',$self);
			if(input.length){
				setInputValue(name,value,$self);
				if(values[name+'_name']){
					input.data('_namespace',values[name+'_name']);
				}
			};
		}
	});		
	
};

/**
 *设置表单效果
 */

;$.fn.setFormViews=function(opts){
	
	var options=$.extend(true,{
				verifications:'',//验证表单事件
				onCancel:$.noop,//点击取消时的事件
				onConfirm:$.noop,//点击确定时的事件
				requestUrl:'',//保存时的请求地址，onSubmit未重设时有效
				selector:'.formList[role]',
				onSuccessMsg:'设置成功',//提交成功后的提示文字
				onSuccess:function(){
					if(appSys!='web'||isPhoneState){
						 if(window.closeCurrentTab){
						 	 closeCurrentTab('back');
						 };
					  }else{
						  Tips('success',options.onSuccessMsg);
					  };
				},//提交成功时的事件
				onSubmit:function(submitValues){
					if(!options.requestUrl)return;
					rpcJSON(options.requestUrl,submitValues,function(backData){
						options.onSuccess(backData);
					});
				},
				submitBtn:'a[role="submit"]'//保存表单的按钮
			},opts);
	
	return this.each(function(){
		var $self=$(this);
		
		//为表单设置效果
		$(options.selector,$self).each(function(){
			var $this=$(this),
				input=$(':input:first',$this);
			switch($this.attr('role')){
				
				//图标
				case 'formIcon':
					input.setImgInput();
				break;
				
				//图片列表
				case 'imglist':
					input.setImgListInput();
				break;
				
				case 'expandSelect':
				     input.inputExpandSelect();
				break;
				
				case 'datepicker':
				     datepicker(input);
				break;
				
				case 'timepicker':
				     timepicker(input);
				break;
				
				case 'editor':
				     textareaToEditor(input);
				break;
			}
		});
		
		
		$self.delegate(options.submitBtn,click,function(){
			var values=getFormValue($('form',$self));
				
			if($.isFunction(options.verifications)){
				//验证所有表单
				formVerifications(options.verifications,values,function(){
					options.onSubmit(values);
					
				});
			}else{
				options.onSubmit(values);
			}
		});
		
		//如果是宽屏电脑中，插入提交按钮，回车提交表单
		if(appSys=='web'&&!isPhoneState){
			$('<input type="submit" style="display:none;"/>').appendTo($('form',$self));
			$self.delegate('form','submit',function(e){
				e.preventDefault();
				$self.find(options.submitBtn).trigger(click);
			});
		}
	});		
	
};


/**
 *设置表单的手机效果
 */

$.fn.fancyFormApps=function(title,opts){
	
	var options=$.extend(true,{
				verifications:'',//验证表单事件
				onBack:$.noop,//后退时的事件
			},opts);
	
	return this.each(function(){
		var $self=$(this);
		
		$self.addClass('fancyFormApps');
		
		$('span.formValue',$self).each(function(){
			var input=$(this).parents('.formList:first').find(':input[type=hidden]:first'),
				roleInput=$(this).parents('.formList:first').find(':input[role]:first'),
				inputRole=roleInput.attr('role'),
				value='';
			if(input.length){
				if(input.attr('role')=='expandSelect'){
					if(input.data('_namespace')){
						value=input.data('_namespace');
					};
				}else{
					value=input.val();
				};
				if(value!=''){
					$(this).text(value.substring(0,50));		
				}
			};
			if(inputRole=='datepicker'||inputRole=='timepicker'){
				$(this).text(roleInput.val());
			};
		});
		
		$(':input',$self).each(function(){
			if(!$(this).attr('placeholder')){
				$(this).attr('placeholder','请输入');
			};
			$(this).placeholder();
			return;		
		});
		
		$self.delegate('.formListL',click,function(){
			if(isPhoneState){
				var $this=$(this),
					$parent=$this.parent(),
					$next=$this.next(),
					input=$next.find('input[type="text"],input[type="password"],input[type="tel"],input[type="email"],textarea');
				
				//如果是图片则打开文件
				if($parent.hasClass('formIcon')){
					$next.find('div.uploadPicBox').trigger(click);
					return;
				}else if($parent.hasClass('formeExpandSelect')){
					$next.find('div.expandSelectBtn').trigger(click);
					return;
				}else if($parent.hasClass('phoneTrigger')){
					$next.find('div.expandSelectBtn').trigger(click);
					return;
				}else if($parent.attr('role')=='datepicker'){
					input.trigger(click);
					return;
				}else if($parent.attr('role')=='timepicker'){
					input.trigger(click);
					return;
				};
				return;
				if(!input.length){
					return;
				};
				
				var resetValue=input.val(),
					valueEl=$this.find('span.formValue');
				
				$this.next().addClass('show');
				$self.addClass('showNext');
				input.trigger('focus');
				
				var opts={
					title:$this.find('p.formTitle').text(),
					left:'<',
					right:'确定',
					leftCallback:true,
					rightCallback:true
				},
				callback=function(action){
					var newValue=input.val(),
						goBack=function(){
							$this.next().removeClass('show');
							$self.removeClass('showNext');
							if($.isFunction(options.onBack)){
								options.onBack(action);
							}
						},
						fn=function(){
							valueEl.text(newValue?newValue.substring(0,50):'');
							goBack();
						};
					if(action=='left'){
						input.val(resetValue);
						goBack();
					}else{
						if($.isFunction(options.verifications)){
							options.verifications(input.attr('name'),newValue,fn);
						}else{
							fn();
						};
						
					};
					
				};
				
			//重设顶部工具条
			resetTopBar(opts,callback);
			};
		}).delegate(':input','change',function(){
			var span=$(this).parents('.formList:first').find('span.formValue');
			switch($(this).attr('role')){
				case 'expandSelect':
					span.text($(this).data('showName'));
				break;	
				case 'datepicker':
					span.text($(this).val());
				break;	
				case 'timepicker':
					span.text($(this).val());
				break;	
				
				default :
					//span.text($(this).val());
				break;
				
			}
		});
			
	});
};

/**
 *设置单张图片的表单
 */

;$.fn.setImgInput=function(opts){
	var options=$.extend(true,{
			extensions:'jpg,gif,png,jpeg',
			containerCls:'uploadPicBox',//图片容器样式
			activeCls:'active'//上传图片后的样式
		},opts);
	
	return this.each(function(){
		var input=$(this),
			extensions=input.data('extensions')?input.data('extensions'):options.extensions,
			extensions=extensions=='video'?videoExtensions:extensions,
			uploadPicBox=$('<div class="'+options.containerCls+' '+(extensions==videoExtensions?'videoPicBox':'')+'" data-crop="'+input.data('crop')+'"><div><span role="view">查看</span><span role="change">更换</span><span role="del">删除</span></div></div>').insertAfter(input),
			img=$('<img style="display:none;" />').appendTo(uploadPicBox),
			toChange=function(){
				openFinder({
					extensions:extensions,
					selectCount:1,
					callBack:function(backData){
						var data=backData[0];
						input.val(data.file).trigger('change');
					}
				});	
			};
		
		
		input.on('change',function(){
			var value=input.val();
			if(value){
				var src=value.indexOf('.mp4')>=0?value.replace('.mp4','.png'):value;
				uploadPicBox.addClass(options.activeCls);
				img.data('src',src).setThumbImageView();
			}else{
				uploadPicBox.removeClass(options.activeCls);
				img.attr('src','').hide();
			}
		}).trigger('change');
		
		uploadPicBox.on(click,function(){
			
			var value=input.val();
			if(value&&isPhoneState){
				var dialog=MenuDialog([{
											name:'查看',
											value:'view'
										},
										{
											name:'更换',
											value:'change'
										},
										{
											name:'删除',
											value:'del'
										}
					]);
				
				dialog.delegate('ul a',click,function(e){
					var role=$(this).data('value');
					e.stopPropagation();
					e.preventDefault();
					dialog.close(function(){
						$('span[role="'+role+'"]',uploadPicBox).trigger(click);
					});
				});	
			}else{
				toChange();
			};
		}).delegate('span[role]',click,function(e){
			switch ($(this).attr('role')){
				case 'view':
					var value=input.val();
					fileView(value);
				break;
				case 'change':
					toChange();
				break;
				case 'del':
					input.val('').trigger('change');
				break;
			};
			e.stopPropagation();
		});
	});
};

/**
 *设置图片列表表单
 */

;$.fn.setImgListInput=function(opts){
	var options=$.extend(true,{
			extensions:'jpg,gif,png,jpeg',
			containerCls:'uploadPicBox',//图片容器样式
			activeCls:'active',//上传图片后的样式
			count:9999
		},opts);
	
	return this.each(function(){
		var input=$(this),
			count=input.data('count')?input.data('count'):options.count,
			extensions=input.data('extensions')?input.data('extensions'):options.extensions,
			extensions=extensions=='video'?videoExtensions:extensions,
			uploadPicBox=$('<div class="'+options.containerCls+' '+(extensions==videoExtensions?'videoPicBox':'')+'" data-crop="'+input.data('crop')+'"></div>').insertAfter(input),
			addPic=function(file){
				var box=$('<div class="'+options.containerCls+' '+(extensions==videoExtensions?'videoPicBox':'')+' active" data-crop="'+input.data('crop')+'" ><div><span role="view">查看</span><span role="del">删除</span></div></div>').data('file',file).insertBefore(uploadPicBox);
				var img=$('<img />').appendTo(box);
				img.data('src',file.replace('.mp4','.png')).setThumbImageView();
				box.delegate('span[role]',click,function(e){
					switch($(this).attr('role')){
						case 'del':
							box.remove();
							resetValue();
						break;
						case 'view':
							fileView(box.data('file'));
						break;
					};
					e.stopPropagation();
				})
			},
			resetValue=function(){
				var value=uploadPicBox.siblings('.'+options.containerCls).map(function(){
					return 	$(this).data('file');
				}).get();
				input.val(value.join(','));
				if(count!=0&&value.length>=count){
					uploadPicBox.hide();
				}else{
					uploadPicBox.show();
				};
			};
		
		input.parent().phoneMenuDialog({
			target:'div.active',
			btnCls:'span[role]'
		});
				
		uploadPicBox.on(click,function(){
			
			openFinder({
					extensions:extensions,
					selectCount:count!=0?count-uploadPicBox.siblings('.'+options.containerCls).length:0,
					callBack:function(backData){
						$.each(backData,function(i,item){
							addPic(item.file);
						});
						resetValue();
					}
				});	
		});
		
		if(input.val()){
			$.each(input.val().split(','),function(i,item){
				addPic(item);
			});
		}
	});
};


/**
 *设置下拉列表值
 */
 
;$.fn.setSelect = function(data,selected){
	if(!data)return;
	return this.each(function(i) { 
		var selectValue=selected?selected:$(this).val()?$(this).val():0,
			selectHtml='';
		$.each(data,function(i,item){
			selectHtml+='<option value="'+item.id+'" ';
			if(item.id==selectValue){
				selectHtml+=' selected';
			};
			selectHtml+='>'+item.name+'</option>';				 
		});
		$(this).html(selectHtml);
		
		if($(this).width()<50){
			$(this).css('width','auto');
		};
	});
};

;$.fn.setGroupSelectList=function(opts){
	var options=$.extend(true,{
			selectbox:true,//是否显示选择框
			selectmode:1,//选择方式，1为全部可选择，2为最后一级可选择
			count:1,
			icon:true,
			data:'',
			requestUrl:'',
			requestData:'',
			defaultValues:'',
			defaultData:'',
			joinpathname:'',
			onReady:$.noop,
			onSelected:$.noop
		},opts);
	return this.each(function(){
		var selectlist=$(this),
			$listContainer=$('<div class="selectListContainer" />').appendTo(selectlist),
			$container=$('<div class="selectContent"></div>').appendTo($listContainer),
			count=options.count,
			selectmode=options.selectmode||1,
			selectedValues=options.defaultValues||[],
			selectedData=options.defaultData||'',
			joinpathname=options.joinpathname||'',
			selectedBar='',
			selectedCountEl='',
			selectedContainer='',
			setData=function(data,el,son,pathName,pathId){
				if(!data.length)return;				
				if(!pathName){
					pathName=[];
				};
				if(!pathId){
					pathId=[];
				};
				$.each(data,function(i,item){
					item.id=item.id.toString();
					var tpName=pathName.slice(0);
						tpName.push(item.name);
					item.pathName=tpName;
					var tpId=pathId.slice(0);
						tpId.push(item.id);
					item.pathId=tpId;
					if(selectedData[item.id]&&!selectedData[item.id]['name']){
						selectedData[item.id]=item;
					};
					var activeCls=($.inArray(item.id,selectedValues)>-1)?'active':'',
						childCls=((item.children&&item.children.length)||item.isFolder)?'child family '+(activeCls?'open':''):'',
						selectableCls=(item.unselectable||(selectmode=='2'&&childCls))?'unselectable':'',
						li=$('<li class="selectItem '+childCls+' '+activeCls+' '+selectableCls+' '+(son?'sonLi':'')+'" data-id="'+item.id+'">'+
							'<a href="javascript:;" class="'+(son?'selectSonBar pane clearfix':'setRow selectLink')+'">'+
								'<div class="'+(son?'selectSonBox':'setRowL')+'">'+
									(((selectmode=='2'&&childCls)||!options.selectbox)?'':'<div class="hookLabel"><span class="hookBox"><i class="xzicon-yes hook"></i></span></div>')+
									(item.icon&&options.icon?'<span class="picBox" data-crop="1"><img data-src="'+item.icon+'"></span>':'')+
									'<span>'+item.name+'</span>'+
								'</div>'+
								(childCls?'<div class="setRowR" role="openchild"><i class="xzicon-arrow-r"></i></div>':'')+
							'</a>'+
						'</li>');
					li.appendTo(el).data('data',item);	
					if(item.icon){
						$('img',li).setThumbImageView();	
					};
					if(item.children&&item.children.length){
						var ul=$('<ul data-id="0" class="selectSon xz_list row3 row12_ph show"></ul>').appendTo(li);
						setData(item.children,ul,true,item.pathName,item.pathId);
					}
				});
			},
			getData=function(el,data,callback){
				if(!options.requestUrl)return;
				var reData=$.extend(true,(options.requestData||{}),data),
					loadings=$(getContentLoading());
				el.append(loadings);
				rpcJSON(options.requestUrl,reData,function(backData){
						loadings.remove();
						if($.isFunction(callback)){
							callback(backData);
						}
					},function(msg){
						loadings.remove();
						el.append(msg);
					});
			},
			getSelectedData=function(){
				var datas={
						ids:[],
						name:[]
					};
				for(key in selectedData){
					datas.ids.push(selectedData[key].id);
					var names=joinpathname?selectedData[key].pathName.join(joinpathname):(selectedData[key].name||selectedData[key].id);
					
					datas.name.push(names);
				};
				
				return datas;
			},
			selected=function(){
				var names;
				if(count==1){
					selectedValues=[selectedData.id];
					names=joinpathname?selectedData.pathName.join(joinpathname):selectedData.name;
				}else{
					var data=getSelectedData();
					selectedValues=data.ids;
					names=data.name;
					selectedCountEl.text(selectedValues.length);
				};
				options.onSelected(selectedData,selectedValues,names);
			},
			getNewUl=function(id){
				var ul=$('<ul data-id="0" class="show"></ul>').appendTo($container);
	
				
				return ul;
			},
			showSelectedContainer=function(){
				if(!selectedContainer){
					selectedContainer=$('<div class="selectContent selectedContainer"><ul class="show"></ul><div class="selectedHeadBar clearfix"><p class="title fl">已选(<span role="selectedCount"></span>)</p><a href="javascript:;" class="button b1 fr" role="closeSelected">关闭</a></div></div>').insertAfter(selectedBar);
					selectedContainer.delegate('div[role="remove"]',click,function(){
						var li=$(this).parents('li:first'),
							id=li.data('id');
						li.hideRemove();
						var seLi=$('li[data-id="'+id+'"]',$container);
						seLi.removeClass('active');
						if(seLi.length){
							seLi.removeClass('active');
							changeState(seLi);
						}else{
							delete selectedData[id];
						};
						selected();
						selectedContainer.find('span[role="selectedCount"]').text(selectedValues.length);
						if(!selectedValues.length){
							selectedContainer.removeClass('show');
						}
					}).delegate('a[role="closeSelected"]',click,function(e){
						e.stopPropagation();
						selectedContainer.removeClass('show');
					});
				};
				var html='';
				for(key in selectedData){
					var sData=selectedData[key],
						sName=sData.name;
					if(!sName){
						var sli=$('li.selectItem[data-id="'+sData.id+'"]',$container);
						if(sli.length){
							sData=sli.data('data');
							sName=sData.name;
						}else{
							sName=sData.id;
						};
						
					};
					html+='<li class="selectItem" data-id="'+sData.id+'">'+
							'<a href="javascript:;" class="setRow selectLink">'+
								'<div class="setRowL">'+
									(sData.icon?'<span class="picBox" data-crop="1"><img data-src="'+sData.icon+'"></span>':'')+
									'<span>'+sName+'</span>'+
								'</div>'+
								'<div class="setRowR" role="remove"><i class="xzicon-close"></i></div>'+
							'</a>'+
						'</li>';
				};
				selectedContainer.find('ul').html(html);
				selectedContainer.find('span[role="selectedCount"]').text(selectedValues.length);
				if(sData.icon){
					$('img',selectedContainer).setThumbImageView();	
				};
				setTimeout(function(){
					selectedContainer.addClass('show');
				},10);
				
			},
			checkLength=function(){
				var length=getSelectedData().ids.length;
				if(count!=0&&length>=count){
					  return false;
				  };
				 return true;
			},
			changeState=function($parent){
				
				var pData=$parent.data('data');
				if($parent.hasClass('active')){
					selectedData[pData.id]=pData;
					if($parent.hasClass('child')){
						$parent.addClass('open');
						$parent.find('>ul >li').each(function(){
							if(!checkLength())return;
							$(this).addClass('active');
							var sData=$(this).data('data');
							selectedData[sData.id]=sData;
						});
					};
					if(selectmode!=2){
						if($parent.hasClass('sonLi')){
							var $pli=$parent.parents('li.selectItem:first');
							if(!$pli.hasClass('active')&&!$pli.hasClass('unselectable')){
								if(!checkLength())return;
								$pli.addClass('active');
								var lData=$pli.data('data');
								selectedData[lData.id]=lData;
							}
						};
					};
					
				}else{
					if($parent.hasClass('child')){
						$parent.removeClass('open');
						$parent.find('>ul >li').each(function(){
							$(this).removeClass('active');
							var sid=$(this).data('id');
							delete selectedData[sid];
							if(selectedContainer){
								$('li[data-id="'+sid+'"]',selectedContainer).hideRemove();
							}
						});
					};
					$parent.removeClass('open');
					delete selectedData[pData.id];
				};
			};
			
			if(selectedValues&&typeof selectedValues=='string'){
				selectedValues=selectedValues.split(',');
			};
			
			//设置已选择的数据
			if(!selectedData){
				if(selectedValues.length){
					 selectedData={};
					 $.each(selectedValues,function(i,item){
						selectedData[item]={
							id:item
						};
					});
				}else{
					selectedData={};
				}
			};
			//如果是多选，则设置已选项
			if(count!=1){
				selectedBar=$('<div class="selectFootBar clearfix"><a href="javascript:;" class="button b1 fl" role="showSelected">已选(<span role="selectedCount">'+selectedValues.length+'</span>)</a><a href="javascript:;" class="button b1 fr" role="selcetedAll">全选</a></div>').insertAfter($container);
				selectedBar.delegate('a[role="selcetedAll"]',click,function(e){
					
				   $('li:not(.active,.unselectable)',$container).trigger(click);
				   e.stopPropagation();
				   e.preventDefault();
			    }).delegate('a[role="showSelected"]',click,function(){
					if(selectedValues.length){
						showSelectedContainer();
					};
				});
				selectedCountEl=$('span[role="selectedCount"]',selectedBar);
			};
			
			$container.delegate('li',click,function(e){
				e.preventDefault();
				e.stopPropagation();
				if(!$(this).hasClass('unselectable')){
					if($(this).hasClass('back')){
						loadData($container,{id:$(this).data('backid')},true);
						return;
					};
					var $parent=$(this);
					if(count==1){
						$('li.active',$container).removeClass('active');
						$parent.addClass('active');
						selectedData=$parent.data('data');
						selected();
					}else{
						if(!$parent.hasClass('active')){
							if(!checkLength()){
								Tips('error','最多可以选择'+count+'项');
								return;
							}
						};
						$parent.toggleClass('active');
						changeState($parent);
						selected();
					};
				}else{
					if($(this).find('div[role="openchild"]').length){
						$(this).find('div[role="openchild"]').trigger(click);
					}
				}
				
			}).delegate('div[role="openchild"]',click,function(e){
				var $li=$(this).parents('li:first');
				$li.toggleClass('open');
				e.preventDefault();
				e.stopPropagation();
		   });
		   
		this.resetSelectData=function(data){
			 selectedData=data;
			 selectedValues=getSelectedData().ids;
			 $('li.active.selectItem',$container).each(function(){
				  var id=$(this).data('id');
				  if(!selectedData[id]){
					$(this).removeClass('active');
				  }
			  });
			
			$.each(selectedValues,function(i,item){
				 $('li.selectItem[data-id="'+item+'"]',$container).addClass('active');
			});  
			
			if(selectedCountEl){
				selectedCountEl.text(selectedValues.length);
			};
			if(selectedContainer){
				selectedContainer.removeClass('show');
			}
			  
		};
		
		if(options.data&&options.data.length){
			var ul=getNewUl();
			setData(options.data,ul);
			options.onReady();
		}else if(options.requestUrl){
			var ul=getNewUl();
			getData(ul,{},function(backData){
				setData(backData,ul);
				options.onReady(backData);
			});
		};
		
	});
};

/**
 *设置选项列表
 *selectbox//是否显示选择框，默认为true，显示
 *selectmode//选择方式，1为全部可选择，2为最后一级可选择,
 *relevance//相关选择性，selectmode为1时有效，1为上级选中时，下级全部选中，下级未全选时，上级不选中。2为上下级可同时选中，
 *count//可选数量，1为单选，0为不限制，其他数量为最多可选几项
 data:[{
	 isFolder:是否还有下级,
	 children:[]下级数据，ajax动态请求时，无须设置
	 unselectable:禁止选择
	 id:数值,
	 name:显示名称,
	 icon：图标
	 }]可选数据，数组
 requestUrl//ajax请求地址
 requestData//ajax请求数据，选择下级时，requestData扩展parentId，请求该parentId的下级
 
 defaultValues:已选id数组
 defaultData:已选数据
 backTitle:'返回上级'显示的文字,
 onReady:$.noop,//第一次数据插入后的事件
 onSelected:$.noop//每次选择或取消选择时的事件，返回selectedData,selectedValues,names。
 joinpathname:符号，将多层级名称根据符号拼接返回。
 */

;$.fn.setSelectList=function(opts){
	var options=$.extend(true,{
			selectbox:true,//是否显示选择框
			selectmode:1,//选择方式，1为全部可选择，2为最后一级可选择
			relevance:1,//关联选择，
			count:1,
			icon:true,
			data:'',
			requestUrl:'',
			requestData:'',
			defaultValues:'',
			defaultData:'',
			backTitle:'返回上级',
			joinpathname:'',
			onReady:$.noop,
			onSelected:$.noop
		},opts);
	return this.each(function(){
		var selectlist=$(this),
			$listContainer=$('<div class="selectListContainer" />').appendTo(selectlist),
			$container=$('<div class="selectContent"></div>').appendTo($listContainer),
			backId=-1,
			parentId=0,
			count=options.count,
			selectmode=options.selectmode||1,
			relevance=options.relevance||1,
			selectedValues=options.defaultValues||[],
			selectedData=options.defaultData||'',
			joinpathname=options.joinpathname||'',
			selectedBar='',
			selectedCountEl='',
			selectedContainer='',
			setData=function(data,el){
				if(!data.length)return;				
				var pathName=el.data('pathName'),
					pathId=el.data('pathId');
				$.each(data,function(i,item){
					if(!item.name&&item.title){
						item.name=item.title;
					};
					if(!item.id&&item.key){
						item.id=item.key;
					};
					item.id=item.id.toString();
					var tpName=pathName.slice(0);
						tpName.push(item.name);
					item.pathName=tpName;
					var tpId=pathId.slice(0);
						tpId.push(item.id);
					item.pathId=tpId;
					
					if(selectedData[item.id]&&!selectedData[item.id]['name']){
						selectedData[item.id]=item;
					};
					var childCls=((item.children&&item.children.length)||item.isFolder)?'child':'',
						activeCls=($.inArray(item.id,selectedValues)>-1)?'active':'',
						selectableCls=(item.unselectable||(selectmode=='2'&&childCls))?'unselectable':'',
						li=$('<li class="selectItem '+childCls+' '+activeCls+' '+selectableCls+'" data-id="'+item.id+'">'+
							'<a href="javascript:;" class="setRow selectLink">'+
								'<div class="setRowL">'+
									(((selectmode=='2'&&childCls)||!options.selectbox)?'':'<div class="hookLabel"><span class="hookBox"><i class="xzicon-yes hook"></i></span></div>')+
									(item.icon&&options.icon?'<span class="picBox" data-crop="1"><img data-src="'+item.icon+'"></span>':'')+
									'<span>'+item.name+'</span>'+
								'</div>'+
								(childCls?'<div class="setRowR" role="openchild"><i class="xzicon-arrow-r"></i></div>':'')+
							'</a>'+
						'</li>');
					li.appendTo(el).data('data',item);	
					if(item.icon){
						$('img',li).setThumbImageView();	
					};
				});
			},
			getData=function(el,data,callback){
				if(!options.requestUrl)return;
				var reData=$.extend(true,(options.requestData||{}),data),
					loadings=$(getContentLoading());
				el.append(loadings);
				rpcJSON(options.requestUrl,reData,function(backData){
						loadings.remove();
						if($.isFunction(callback)){
							callback(backData);
						}
					},function(msg){
						loadings.remove();
						el.append(msg);
					});
			},
			loadData=function(el,tData,isBack){
				backId=parentId;
				parentId=tData.id;
				
				var ul,
					oul=$('ul.show',$container);
				if(count!=1){
					$('a[role="selcetedAll"]',selectedBar).hide();
				};
				var checkSelectBox=function(){
					if(count!=1&&$('li:not(.unselectable)',ul).length){
						$('a[role="selcetedAll"]',selectedBar).show();
					};
				};
				
				if($('ul[data-id="'+parentId+'"]',$container).length){
					
					ul=$('ul[data-id="'+parentId+'"]',$container).addClass('show');	
					checkSelectBox();
				}else if(tData.children&&tData.children.length){
					
					ul=getNewUl(tData.pathName,tData.pathId);
					setData(tData.children,ul);
					checkSelectBox();
				}else{
					ul=getNewUl(tData.pathName,tData.pathId);
					
					getData(ul,{parentId:parentId},function(backData){
						if(backData.length){
							setData(backData,ul);
							checkSelectBox();
						}else{
							ul.append(getEmptyContent());
						};
					});
				};
				
				if(oul.length){
					if(isBack){
						oul.animate({left:'100%'},'normal','easeOut',function(){
							oul.removeClass('show');
						});
						ul.addClass('show').css({left:'-100%'}).animate({left:0},'normal','easeOut');
					}else{
						oul.animate({left:'-100%'},'normal','easeOut',function(){
							oul.removeClass('show');
						});
						ul.css({left:'100%'}).animate({left:0},'normal','easeOut');
					}
				
				};
			},
	
			getSelectedData=function(){
				var datas={
						ids:[],
						name:[]
					};
				for(key in selectedData){
					datas.ids.push(selectedData[key].id);
					var names=joinpathname?selectedData[key].pathName.join(joinpathname):(selectedData[key].name||selectedData[key].id);
					
					datas.name.push(names);
				};
				
				return datas;
			},
			selected=function(){
				var names;
				if(count==1){
					selectedValues=[selectedData.id];
					names=joinpathname?selectedData.pathName.join(joinpathname):selectedData.name;
					
				}else{
					var data=getSelectedData();
					selectedValues=data.ids;
					names=data.name;
					selectedCountEl.text(selectedValues.length);
				};
				
				options.onSelected(selectedData,selectedValues,names);
			},
			getNewUl=function(pathName,pathId){
				if(!pathName){
					pathName=[];
				};
				if(!pathId){
					pathId=[];
				};
				var ul=$('<ul data-id="'+parentId+'"></ul>').appendTo($container);
				$('ul.show',$container).removeClass('show').addClass('hide');
				$('ul[data-id="'+parentId+'"]',$container).addClass('show');
				if(backId!=-1){
					$('<li class="selectItem back" data-backid="'+backId+'">'+
						'<a href="javascript:;" class="setRow selectLink">'+
							'<div class="setRowL">'+
								'<span>'+options.backTitle+'</span>'+
							'</div>'+
						'</a>'+
					'</li>').appendTo(ul);
				};
				ul.data({pathName:pathName,pathId:pathId});
				return ul;
			},
			showSelectedContainer=function(){
				if(!selectedContainer){
					selectedContainer=$('<div class="selectContent selectedContainer"><ul class="show"></ul><div class="selectedHeadBar clearfix"><p class="title fl">已选(<span role="selectedCount"></span>)</p><a href="javascript:;" class="button b1 fr" role="closeSelected">关闭</a></div></div>').insertAfter(selectedBar);
					selectedContainer.delegate('div[role="remove"]',click,function(){
						var li=$(this).parents('li:first'),
							id=li.data('id');
						li.hideRemove();
						var seLi=$('li[data-id="'+id+'"]',$container);
						seLi.removeClass('active');
						delete selectedData[id];
						selected();
						selectedContainer.find('span[role="selectedCount"]').text(selectedValues.length);
						if(!selectedValues.length){
							selectedContainer.removeClass('show');
						}
					}).delegate('a[role="closeSelected"]',click,function(e){
						e.stopPropagation();
						selectedContainer.removeClass('show');
					});
				};
				var html='';
				for(key in selectedData){
					var sData=selectedData[key],
						sName=sData.name;
					if(!sName){
						var sli=$('li.selectItem[data-id="'+sData.id+'"]',$container);
						if(sli.length){
							sData=sli.data('data');
							sName=sData.name;
						}else{
							sName=sData.id;
						};
						
					};
					html+='<li class="selectItem" data-id="'+sData.id+'">'+
							'<a href="javascript:;" class="setRow selectLink">'+
								'<div class="setRowL">'+
									(sData.icon?'<span class="picBox" data-crop="1"><img data-src="'+sData.icon+'"></span>':'')+
									'<span>'+sName+'</span>'+
								'</div>'+
								'<div class="setRowR" role="remove"><i class="xzicon-close"></i></div>'+
							'</a>'+
						'</li>';
				};
				selectedContainer.find('ul').html(html);
				selectedContainer.find('span[role="selectedCount"]').text(selectedValues.length);
				if(sData.icon){
					$('img',selectedContainer).setThumbImageView();	
				};
				setTimeout(function(){
					selectedContainer.addClass('show');
				},10);
				
			};
			
			if(selectedValues&&typeof selectedValues=='string'){
				selectedValues=selectedValues.split(',');
			};
			
			//设置已选择的数据
			if(!selectedData){
				if(selectedValues.length){
					 selectedData={};
					 $.each(selectedValues,function(i,item){
						selectedData[item]={
							id:item
						};
					});
				}else{
					selectedData={};
				}
			};
			//如果是多选，则设置已选项
			if(count!=1){
				selectedBar=$('<div class="selectFootBar clearfix"><a href="javascript:;" class="button b1 fl" role="showSelected">已选(<span role="selectedCount">'+selectedValues.length+'</span>)</a><a href="javascript:;" class="button b1 fr" role="selcetedAll">全选</a></div>').insertAfter($container);
				selectedBar.delegate('a[role="selcetedAll"]',click,function(e){
				   $('ul.show >li:not(.active,.unselectable,.back)',$container).trigger(click);
				   e.stopPropagation();
				   e.preventDefault();
			    }).delegate('a[role="showSelected"]',click,function(){
					if(selectedValues.length){
						showSelectedContainer();
					};
				});
				selectedCountEl=$('span[role="selectedCount"]',selectedBar);
			};
			
			$container.delegate('li',click,function(e){
				e.preventDefault();
				e.stopPropagation();
				if(!$(this).hasClass('unselectable')){
					if($(this).hasClass('back')){
						loadData($container,{id:$(this).data('backid')},true);
						return;
					};
					var $parent=$(this);
					if(count==1){
						$('li.active',$container).removeClass('active');
						$parent.addClass('active');
						selectedData=$parent.data('data');
						selected();
					}else{
						if(!$parent.hasClass('active')){
							if(count!=0&&selectedValues.length>=count){
								Tips('error','最多可以选择'+count+'项');
								return;
							}
						};
						$parent.toggleClass('active');
						var pData=$parent.data('data');
						if($parent.hasClass('active')){
							selectedData[pData.id]=pData;
						}else{
							delete selectedData[pData.id];
						};
						selected();
					};
				}else{
					if($(this).find('div[role="openchild"]').length){
						$(this).find('div[role="openchild"]').trigger(click);
					}
				}
				
			}).delegate('div[role="openchild"]',click,function(e){
				var $li=$(this).parents('li:first');
				loadData($container,$li.data('data'));		
				
				e.preventDefault();
				e.stopPropagation();
		   });
		   
		this.resetSelectData=function(data){
			 selectedData=data;
			 selectedValues=getSelectedData().ids;
			 $('li.active.selectItem',$container).each(function(){
				  var id=$(this).data('id');
				  if(!selectedData[id]){
					$(this).removeClass('active');
				  }
			  });
			
			$.each(selectedValues,function(i,item){
				 $('li.selectItem[data-id="'+item+'"]',$container).addClass('active');
			});  
			
			if(selectedCountEl){
				selectedCountEl.text(selectedValues.length);
			};
			if(selectedContainer){
				selectedContainer.removeClass('show');
			}
			  
		};
		if(options.data&&options.data.length){
			var ul=getNewUl();
			setData(options.data,ul);
			options.onReady(options.data);
		}else if(options.requestUrl){
			var ul=getNewUl();
			getData(ul,{},function(backData){
				setData(backData,ul);
				options.onReady(backData);
			});
		};
		
	});
};

/**
 *设置多级选择对话框
 ｛
 onSelected：function(selectedData,selectedValues,showName){
	 
 },
 selectOpts:同setSelectList参数
 ｝
 */

;function expandSelectDialog(opts){
	var dialog,
		count=opts.selectOpts.count==undefined?1:opts.selectOpts.count,
		defaultValues=opts.selectOpts.defaultValues||[],
		defaultName=opts.selectOpts.defaultName||[],
		defaultData=opts.selectOpts.defaultData||'',
		selectedValues,
		selectedData,
		selectedName='',
		selectList,
		setData=function(){
			var showName;
			if(count==1){
				showName=selectedData.name||selectedName;
				
			}else{
				showName='已选择'+selectedValues.length+'('+selectedName+')';
				
			};
			options.onSelected(selectedData,selectedValues,showName);
		},
		options=$.extend(true,{
			selectType:1,
			onSelected:function(data){
				  
			},
			dialogOpts:{
				  
				  cls:'SelectDialog '+(count!=1?'multi-selected':''),
				  confirmText:count!=1?'确认':'',
				  cancelText:count!=1?'取消':'',
				  title:count!=1?opts.title:'',
				  maxHeight:500,
				  height:400,
				  onCancel:function(){
					  selectedValues=defaultValues;
					  selectedData=$.extend({},defaultData);
					  selectedName=defaultName;
					  setData();
					  //selectList.resetSelectData(selectedData);
				  }/*,
				  onBeforeClose:function(){
					  if(dialog.isHide)return;
					  defaultValues=selectedValues;
					  defaultData=$.extend({},selectedData);
					  dialog.hide();
				  },
				  onClose:function(){
					  dialog=null;
				  }*/
			},
			selectOpts:{
				 onSelected:function(data,id,name){
					 selectedValues=id;
					 selectedData=data;
					 selectedName=name;
					 setData();
					 if(count==1){
						 dialog.close();
					 };
				 },
				 onReady:function(){
					 
					 selectList.resetSelectData=selectList[0].resetSelectData;
					 
				 }
			}
		},opts),
		createDialog=function(){
			if(!(options.selectOpts.data||options.selectOpts.requestUrl))return;
			selectList=$('<div class="dialogSelectList"></div>').appendTo('body');
			
			if(options.selectType=='1'){
				selectList.setSelectList(options.selectOpts);
			}else{
				selectList.setGroupSelectList(options.selectOpts);
			}
			
		},
		showDialog=function(){
			$('div.SelectDialog').hide();
			dialog.show();
		},
		hideDialog=function(){
			dialog.hide();
		};
	
  
	if(defaultValues&&typeof defaultValues=='string'){
			defaultValues=defaultValues.split(',');
		};
		
	//设置已选择的数据
	if(!defaultData){
		defaultData={};
		//设置已选择的数据
		if(defaultValues.length){
			 $.each(defaultValues,function(i,item){
				defaultData[item]={
					id:item
				};
			});
		};
	};
	
	selectedValues=defaultValues;
	selectedData=$.extend({},defaultData);
	
	createDialog();
	dialog=Dialog(selectList,options.dialogOpts);
	
	return dialog;
};


$.fn.btnSelectDialog=function(opts){
	
	return this.each(function(){
		if(!opts.selectOpts){
			opts.selectOpts={};
		};
		var btn=$(this),
			count=opts.selectOpts.count==undefined?1:opts.selectOpts.count,
			input=opts.input?opts.input:btn,
			defaultName,
			defaultValues,
			defaultData,
			selectedValues,
			selectedData,
			selectedName='',
			dialog,
			selectList,
			setData=function(){
				var showName;
				if(count==1){
					showName=selectedName;
				}else{
					showName='已选择'+selectedValues.length+'('+selectedName+')';
					
				};
				input.data({
					      selectedValues:selectedValues,
						  selectedData:selectedData,
						  showName:showName
						});
				options.onSelected(selectedData,selectedValues,showName);
			},
			options=$.extend(true,{
				input:'',
				selectType:1,
				onSelected:function(data){
					  
				},
				dialogOpts:{
					  container:isPhoneState?'body':btn.parent(),
					  overlay:isPhoneState?0.9:0,
					  width:btn.outerWidth(),
					  maxHeight:650,
					  height:250,
					  cls:'SelectDialog '+(count!=1?'multi-selected':''),
					  confirmText:count!=1?'确认':'',
					  cancelText:count!=1?'取消':'',
					  title:count!=1?opts.title:'',
					  onCancel:function(){
						  selectedName=defaultName;
						  selectedValues=defaultValues;
						  selectedData=$.extend({},defaultData);
						  setData();
						  //selectList.resetSelectData(selectedData);
					  },
					  /*onBeforeClose:function(){
						  if(dialog.isHide)return;
						  defaultValues=selectedValues;
						  defaultData=$.extend({},selectedData);
						  dialog.hide();
					  },*/
					  onClose:function(){
						  dialog=null;
					  },
					  position:{
							top:btn.outerHeight(),
							left:btn.position().left,
							position:'absolute'
					  }
				},
				selectOpts:{
					 onSelected:function(data,id,name){
						 selectedValues=id;
						 selectedData=data;
						 selectedName=name;
						 setData();
						 if(count==1){
							 dialog.close();
						 };
						
					 },
					 onReady:function(data){
						// var maxHeight=250;
						 if(isPhoneState){
							 maxHeight=$(window).height()-80;
						 }else{
							 maxHeight=Math.min(options.dialogOpts.maxHeight,$(window).height()-(btn.offset().top+btn.outerHeight())-20);
							 
						 };
						 //options.dialogOpts.height=Math.max(selectList.find('ul.show').outerHeight(),options.dialogOpts.height);
						 options.dialogOpts.maxHeight=maxHeight;
						 dialog=Dialog(selectList,options.dialogOpts);
						 selectList.resetSelectData=selectList[0].resetSelectData;
						
						 if(data){
						     input.data('data',data);
						  };
						 
					 }
				}
			},opts),
			createDialog=function(){
				if(!(options.selectOpts.data||options.selectOpts.requestUrl))return;
				selectList=$('<div class="dialogSelectList"></div>').appendTo('body');
				
				if(options.selectType=='1'){
					selectList.setSelectList(options.selectOpts);
				}else{
					selectList.setGroupSelectList(options.selectOpts);
				}
				
			},
			showDialog=function(){
				$('div.SelectDialog').hide();
				dialog.show();
			},
			hideDialog=function(){
				dialog.hide();
			};
		
		
		//重设默认数据；
		
		var resetDatas=function(){
				defaultName=input.data('defaultName')||[];
				defaultValues=input.data('selectedValues')||[];
				defaultData=input.data('selectedData')||'';
				
				if(defaultValues&&typeof defaultValues=='string'){
						defaultValues=defaultValues.split(',');
					};
				
				if(!defaultData){
					defaultData={};
					//设置已选择的数据
					if(defaultValues.length){
						 $.each(defaultValues,function(i,item){
							defaultData[item]={
								id:item
							};
						});
					};
				};
				
				selectedValues=defaultValues;
				selectedData=$.extend({},defaultData);
				
				options.selectOpts.defaultValues=defaultValues;
				options.selectOpts.defaultData=defaultData;
				options.selectOpts.data=input.data('data');
				
				
		};
		
		
					
		btn.on(click,function(e){
			
			if(dialog){
				/*if(dialog.isHide){
					showDialog();
				}else{
					hideDialog();
				}*/
				return;
			}else{
				resetDatas();
				createDialog();
			};
			
			e.stopPropagation();
		});		
			
	});
};

/**
 *表单转多级选择对话框
 selectType为1是多级选择，2是两级连选
 <input name="industry" class="textInput" type="hidden" title="选择行业" role="expandSelect" data-selectbox="1" data-selectmode="1"  data-count="1" data-requesturl="/common/getIndustry" data-selecttype="1">
 如果input设置了data-joinpathname=1，则返回拼接的显示名
 */

;$.fn.inputExpandSelect=function(opts){
	return this.each(function(){
		var input=$(this),
			count=(input.data('count')!=undefined)?input.data('count'):1,
			title=input.attr('title')||'请选择',
			selectmode=input.data('selectmode'),
			selectedName=input.data('_namespace')||title,
			selectType=input.data('selecttype')||1,
			btn=$('<div class="expandSelectBtn"><span>'+selectedName+'</span></div>').insertAfter(input),
			defaultValues=input.val()?input.val().split(','):[],
			defaultData=input.data('selectedData')||'',
			options=$.extend(true,{
					input:input,
					selectType:selectType,
					title:title,
					onSelected:function(data,id,name){
						var showName=name||selectedName,
							joinpathname=input.data('joinpathname');
						if(count==1){
							
							input.val(id[0]);
						}else{
							input.val(id.join(','));
							
						};
						
						input.data('selectedData',data).data('showName',showName).trigger('change');
					},
					dialogOpts:{
						onConfirm:function(){
						
						}
					},
					selectOpts:{
						count:count,
						icon:input.data('icon'),
						selectmode:selectmode,
						joinpathname:input.data('joinpathname'),
						/*defaultValues:defaultValues,
						defaultData:defaultData,*/
						data:input.data('data'),
						requestUrl:input.data('requesturl'),
						requestData:input.data('requestdata'),
						selectbox:input.data('selectbox')==undefined?1:input.data('selectbox'),
						relevance:input.data('relevance')==undefined?1:input.data('relevance')
					}
				
				},opts);
		
		
	    //设置已选择的数据
	    if(!defaultData){
			defaultData={};
			//设置已选择的数据
			if(defaultValues.length>1){
				 $.each(defaultValues,function(i,item){
					defaultData[item]={
						id:item
					};
				});
			}else if(defaultValues.length==1){
				defaultData[defaultValues[0]]={id:defaultValues[0],name:selectedName};
			};
		};
		
		input.data({
				selectedValues:defaultValues,
				selectedData:defaultData,
				showName:selectedName
			  }).on('change',function(){
				$('span',btn).text(input.data('showName'));  
			  });
			  
		btn.btnSelectDialog(options);
		
	});
};

/**
 *清除已选择数据
 */

;$.fn.clearSelectedData=function(){
	return this.each(function(){
		$(this).val('').data({
				selectedValues:'',
				selectedData:[],
				showName:$(this).attr('title')||'请选择',
			}).trigger('change');
	});
};



/**
 *设置日期选择器
 */

;function  datepicker(input,opt){
	input.attr('readonly',true);
	if(!$.fn.datepicker){
		getScripts([staticPath+'/plugins/datepicker/datepicker.css',staticPath+'/plugins/datepicker/datepicker.js'],function(){
			datepicker(input,opt);
		});
		return ;
	};
		
	var container=$('<div />'),
		dialog,
		defaultValue=input.val()||getNowDate(),
		options=$.extend(true,{
			date:defaultValue,
			showDefaultValue:true,
			autohide:true,
			inline:true,
			container:container,
			autoshow:true,
			pick:function(type){
				if(options.autohide&&type.view=='day'){
					dialog.hide();
				}
			}
		},opt);
		
	if(!input.val()&&options.showDefaultValue){
		input.val(getNowDate());
	};
	
	input.datepicker(options);
	
	var dialogOpts={
					  container:isPhoneState?'body':input.parent(),
					  overlay:isPhoneState?0.9:0,
					  width:input.outerWidth(),
					  maxHeight:650,
					  height:350,
					  scroll:true,
					  cls:'picker',
					  cancelText:isPhoneState?'取消':'',
					  onCancel:function(){
						  input.val(defaultValue);
						  input.trigger('change');
					  },
					  onBeforeClose:function(){
						  if(dialog.isHide)return;
						  dialog.hide();
					  },
					  onClose:function(){
						  //dialog.hide();
					  },
					  position:{
							top:input.outerHeight(),
							left:input.position().left,
							position:'absolute'
					  }
				};
	  input.on(click,function(e){
		  if(dialog){
			 defaultValue=input.val();
			 dialog.show(); 
		  }else{
			 dialog=Dialog(container,dialogOpts);  
		  };
		  e.stopPropagation();
	  });
};

/**
 *设置日期选择器
 */


;function timepicker(input,opt){
	
	input.attr('readonly',true);
	
	
	
	var container=$('<div class="timepicker" />'),
		dialog,
		defaultValue=input.val()||getNowDate('time'),
		selectedH,
		selectedM,
		options=$.extend(true,{
			showDefaultValue:true
		},opt),
		getLi=function(type,title){
			var num=type=='h'?24:60,
				html='<dl class="'+(type=='h'?'hoursList':'minutesList')+'"><dt>'+selectedH+':'+selectedM+'</dt><dd><ul class="clearfix">';
			for(i=0;i<num;i++){
				var text=i<=9?'0'+i:i;
				html+='<li data-num="'+text+'" data-type="'+type+'" class="'+(type=='h'?text==selectedH?'active':'':text==selectedM?'active':'')+'">'+text+'</li>';
			};
			html+='</ul></dd></dt>';
			return html;
		},
		getStart=function(){
			selectedH=defaultValue.split(':')[0]||'00';
		    selectedM=defaultValue.split(':')[1]||'00';
			container.html(getLi('h','选择时'));
		};
		
	
	if(!input.val()&&options.showDefaultValue){
		input.val(getNowDate('time'));
	};
	
	container.delegate('li',click,function(){
		var type=$(this).data('type'),
			num=$(this).data('num');
		if(type=='h'){
			selectedH=num;
			container.html(getLi('m','选择分'));
		}else{
			selectedM=num;
			dialog.hide();
		};
		input.val(selectedH+':'+selectedM).trigger('change');
	});
	
	var dialogOpts={
					  container:isPhoneState?'body':input.parent(),
					  overlay:isPhoneState?0.9:0,
					  width:input.outerWidth(),
					  maxHeight:650,
					  height:350,
					  scroll:true,
					  cls:'picker',
					  cancelText:isPhoneState?'取消':'',
					  onCancel:function(){
						  input.val(defaultValue);
						  input.trigger('change');
					  },
					  onBeforeClose:function(){
						  if(dialog.isHide)return;
						  dialog.hide();
					  },
					  onClose:function(){
						  //dialog.hide();
					  },
					  position:{
							top:input.outerHeight(),
							left:input.position().left,
							position:'absolute'
					  }
				};
	  input.on(click,function(e){
		
		  if(dialog){
			 defaultValue=input.val();
			 getStart(); 
			 dialog.show(); 
		  }else{
			 getStart(); 
			 dialog=Dialog(container,dialogOpts);  
		  };
		  e.stopPropagation();
	  });
};

;function resetImageHtml(html){
	var newHtml=$('<div>'+html+'</div>');
	newHtml.find('img').each(function(){
		var $this=$(this);
		$this.css({height:'auto',
				   width:'auto'}).attr('data-autoheight',1);
		if(!$this.hasClass('responsiveImage')){
			$this.addClass('responsiveImage');
		};
	});
	return newHtml.html();
};

/**
 *设置编辑器
 */

;function textareaToEditor(el,opt){
	
	if(isPhoneState){
		el.data('editor',{
			html:function(value){
				el.val(value);
			},
			getData:function(){
				return el.val();
			}
		});
		return;
	}else if(typeof CKEDITOR=='undefined'){
		getScripts([staticPath+'/plugins/ckeditor/samples/sample.css',staticPath+'/plugins/ckeditor/ckeditor.js'],function(){
			
			textareaToEditor(el,opt);
		});
		return false;
	};
	
	var el=$(el),
		vid=getNewId();
	
	if(!el.attr('id')){
		el.attr('id',vid);
	}else{
		vid=el.attr('id');
	};
	
	if(!isPhoneState){
		var opts=$.extend(true,{
			extraPlugins:'image,imagelist,table,horizontalrule,format,font,colorbutton,colordialog,maximize,resize,justify,contextmenu',
				toolbarGroups:[
					//{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
					{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
					{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
					{ name: 'forms' },
					{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
					{ name: 'paragraph', groups: [ 'list',  'align'] },
					{ name: 'links' },
					{ name: 'insert' , groups: [ 'image','imagelist','table','horizontalrule']},
					{ name: 'styles' },
					{ name: 'colors' },
					{ name: 'tools' },
					{ name: 'others'},
				],
			removeButtons:'Cut,Copy,Paste,Anchor,Subscript,Superscript',
			resize_enabled:true,
			on:{
				loaded:function(){
					if($.isFunction(resizeScroll)){
						resizeScroll();
					}
				}/*,
				change:function(){
					el.val(resetImageHtml(editor.getData()));
				},
				blur:function(){
					el.val(resetImageHtml(editor.getData()));
					tests(1);
				}*/
			}
		},opt);
	}else{
		var opts=$.extend(true,{
			//extraPlugins:'image,table,horizontalrule,format,font,colorbutton,colordialog,maximize,resize,justify,contextmenu',
				toolbarGroups:[
					//{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
					//{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
					//{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
					//{ name: 'forms' },
					{ name: 'basicstyles', groups: [ 'basicstyles' ]},
					{ name: 'paragraph', groups: [  'align'] },
					//{ name: 'links' },
					//{ name: 'insert' },
					//{ name: 'styles' },
					//{ name: 'colors' },
					//{ name: 'tools' },
					//{ name: 'others'},
				],
			removeButtons:'Cut,Copy,Paste,Anchor,Subscript,Superscript',
			resize_enabled:true,
			on:{
				loaded:function(){
					if($.isFunction(resizeScroll)){
						resizeScroll();
					}
				}/*,
				change:function(){
					el.val(resetImageHtml(editor.getData()));
				},
				blur:function(){
					el.val(resetImageHtml(editor.getData()));
					tests(1);
				}*/
			}
		},opt);
	};
	
	
	CKEDITOR.replace(vid,opts);	
	
	var editor=CKEDITOR.instances[vid];
	
	editor.html=function(value){
		editor.setData(value);
	};
	
	editor.remove=function(){
		editor.destroy();
	};
	
	el.data('editor',editor);
	
	return editor;
	
};

$.fn.getEditorData=function(){
	return this.each(function(){
		if($(this).data('editor')){
			$(this).val(resetImageHtml($(this).data('editor').getData()));
		};
	});
};



/**
 *设置批量操作栏
 */
 
;$.fn.setEditToolBar=function(opts){
	return this.each(function(){
		if(isPhoneState){
			var $this=$(this),
				options=$.extend(true,{
					toolBtnTitle:'批量操作',
					defaultTitle:'管理',
					defaultRight:'编辑',
					editTitle:'批量编辑',
					editRight:'完成',
					wrapper:'body',
					listEl:'tr[role="item"]',
					noSelectMsg:'您还没有选择数据',
					batchOption:true,
					batchOptionCon:'.tableHead',
					batchOptionBtn:'span[role="batchOperation"]',
					batchOptionItem:'.tableToolList a:not(.cancel)',
					aloneOptionBtn:'.tableToolList a'
				},opts);
				
			var toolEl=$('<div class="editToolBar"><label class="hookLabel"><input type="checkbox" name="checkAll"><span class="hookBox"><i class="xzicon-yes hook"></i></span><span class="hookText">全选</span></label><a href="javascript:;" class="toolBtn">'+ options.toolBtnTitle +'</a></div>'),
				$wrapper=$(options.wrapper);
			
			if(options.batchOption==true){
				$(options.batchOptionCon).phoneMenuDialog({
					target:options.batchOptionBtn,
					btnCls:options.batchOptionItem
				});
			};
			
			
			function defaultTopBar(){
				var defaultOpts={
						title:options.defaultTitle,
						right:options.defaultRight,
						rightCallback:true
					},
					defaultCallback=function(action){
						if(action=='right'){
							editTopBar();
							$wrapper.addClass('batchEdit').append(toolEl);
							$(options.listEl,$this).addClass('edit');
						};
					};
				resetTopBar(defaultOpts,defaultCallback);
			};
			
			function editTopBar(){
				var editOpts={ 
						title:options.editTitle,
						right:options.editRight,
						rightCallback:true
					},
					editCallback=function(action){
						if(action=='right'){
							defaultTopBar();
							$(':checked',$this).each(function(){
								$(this).prop('checked',false);
							});
							$wrapper.removeClass('batchEdit');
							$(options.listEl,$this).removeClass('edit');
							toolEl.remove();
						};
					};
				
				resetTopBar(editOpts,editCallback);
			};
			
			defaultTopBar();
			
			//模拟批量操作
			toolEl.delegate('.toolBtn',click,function(){
				var checks = getAllCheck($this.find('tbody'));
				if(!checks.value.length){
					Tips('error',options.noSelectMsg);
				}else{
					if(options.batchOption==true){
						$(options.batchOptionBtn).trigger(click);
					}else{
						$(options.aloneOptionBtn).trigger(click);
					}
				};
				
			});
			//模拟选中
			$this.delegate(options.listEl+'.edit',click,function(e){
				var $list=$(this);
				
				var checkbox=$('.hookLabel input[type="checkbox"]',$list),
					checked=checkbox.prop('checked');
					
				if(checked==true){
					checkbox.prop('checked',false);
				}else{
					checkbox.prop('checked',true);
				}
			});
		};
	});
	
};

