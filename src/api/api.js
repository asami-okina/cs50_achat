import React, { useState } from 'react';

// 登録するユーザーIDが使用可能かどうか(すでに存在していないか)
export const fetchIsAvailableUserId = (userId) => {
    let result = {
        "isAvailableUserId": true
    }
    return result
};

// ログイン認証
export const postLoginAuthentication = (mail, password) => {
    let result = {
        "certificationResult": true
    }
    return result
}