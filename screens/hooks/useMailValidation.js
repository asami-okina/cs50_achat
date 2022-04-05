import React, { useState } from 'react';

export const useMailValidation = () => {
    // メールアドレスの説明文表示
    const [displayMailDescription, setDisplayMailDescription] = useState(false);
    // メールアドレスアイコンのデフォルト表示
    const [defaultDisplayMailIcons, setDefaultDisplayMailIcons] = useState(false)
    // メールアドレスのバリデーション
    const [isCorrectMail, setIsCorrectMail] =  useState(false);
    // メールアドレスの入力フォームの枠線のデフォルト表示
    const [defaultMailBorderColor, setDefaultMailBorderColor] = useState(false)
    
  
    const handleMailValidation = () => {
      if (rightIcon === 'eye') {
        setRightIcon('eye-off');
        setPasswordVisibility(!passwordVisibility);
      } else if (rightIcon === 'eye-off') {
        setRightIcon('eye');
        setPasswordVisibility(!passwordVisibility);
      }
    };
  
    return {
      passwordVisibility,
      rightIcon,
      handlePasswordVisibility
    };
  };