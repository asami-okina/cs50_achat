import React, { useState } from 'react';

// 登録するユーザーIDが使用可能かどうか(すでに存在していないか)
export const fetchIsAvailableUserId = () => {
    let result = {
        "isAvailableUserId": true
    }
    return result
};