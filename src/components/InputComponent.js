import { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export function InputComponent({inputProps}){

    const { id="",label="",type="text",options=[],name,typing,helperText=[],pattern="",required=false,color="primary",sx={},variant="outlined",typingPatternErrorCheck="",blurPatternErrorCheck="",...inputprops} = inputProps;
  
    // inputprops contains {defaultValue,autoComplete,placeholder}
  
    const [validate,setValidation] = useState({valid:false,invalid:false});
  
    const handleChange=(e)=>{

      typing(e);
      if(typingPatternErrorCheck !== null){
         if(pattern !== "" && required === true){
            if(e.target.pattern !== pattern || e.target.required !== required){
              //  console.log("not matching");
               e.target.pattern = pattern; 
               e.target.required = required;  
            }
            if(new RegExp(pattern).test(e.target.value)){
              return  setValidation({valid:true,invalid:false});    
            }
          }        
       }
    }

    const handleKeydown = (e)=>{
        if(e.target.type === "number"){
            if(e.key === "e"){
                e.preventDefault();
            }
          }
        return;
    }
  
    const handleBlur = (e) =>{
      
      if(blurPatternErrorCheck !== null){
          if(pattern !== "" && required === true){ 
               if(e.target.pattern !== pattern || e.target.required !== required){
                     // console.log("not matching");
                     e.target.pattern = pattern; 
                     e.target.required = required;  
               }
           
               if(!new RegExp(pattern).test(e.target.value)){
                     // e.target.pattern = pattern; 
                     // e.target.required = required;  
                  return  setValidation({valid:false,invalid:true});
               }
          }
      }
  
    }
  
  
    return(
  
      <FormControl sx={{minWidth:250}}
                   error={(validate.invalid)?true:false}
                   color={(validate.valid)?"success":color} 
                   variant={variant}
                   fullWidth={(type === "checkbox")?false:true}>
  
        <InputLabel htmlFor={name} sx={{color:(validate.valid)?"":"",...sx}}
                    color={color} >
              {label}
        </InputLabel>
        {(type === "select")
          ?
          <Select id={(id !== "")?id :name}
                  type={type}
                  sx={{fontSize:"large",color:(validate.valid)?"":(validate.invalid)?"red":""}}
                  onKeyDown={handleKeydown}
                  onChange={handleChange} 
                  onBlur={handleBlur}
                  name={name}
                  inputProps={{pattern:pattern,required:required,...inputprops}}>
               {options.map((option,index)=>
                  <MenuItem key={index} sx={option.sx} disabled={option.disabled} value={option.value}>{(option.disabled)?<em>{option.name}</em>:option.name}</MenuItem>)}
          </Select>
          :(type === "checkbox")
                   ? <FormGroup sx={{...sx,width:"150%"}}>
                       <FormControlLabel control={<Checkbox sx={sx} color={color} onChange={handleChange} name={name} required/>} label={inputProps.check_label} />
                     </FormGroup>
                   :<Input id={(id !== "")?id :name}
                           type={type}
                           sx={{fontSize:"large",color:(validate.valid)?"":(validate.invalid)?"red":""}}
                           onKeyDown={handleKeydown}
                           onChange={handleChange} 
                           onBlur={handleBlur}
                           name={name}
                           inputProps={{pattern:pattern,required:required,...inputprops}}
                   />}
         {(typeof(helperText) !== "string")
             ?helperText.map((helperText,index)=>
                 <FormHelperText key={index} sx={{color:(validate.valid)?"":"",...sx}}>
                 {(validate.valid)?"":helperText}
                 </FormHelperText>)
                 
             : <FormHelperText sx={{color:(validate.valid)?"":"",...sx}}>
                {(validate.valid)?"":(validate.invalid)?`${(type === "select")?"Select a valid "+name:"Enter a valid "+label}.`:helperText}
               </FormHelperText>
             }
      </FormControl>
    )
  }