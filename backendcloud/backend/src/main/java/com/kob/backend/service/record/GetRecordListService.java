package com.kob.backend.service.record;

import com.alibaba.fastjson.JSONObject;
import com.kob.backend.pojo.Record;

public interface GetRecordListService {
    JSONObject getList(Integer page);
    Record getById(Integer id);
}
