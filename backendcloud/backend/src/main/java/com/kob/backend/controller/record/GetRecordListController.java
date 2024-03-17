package com.kob.backend.controller.record;

import com.alibaba.fastjson.JSONObject;
import com.kob.backend.pojo.Record;
import com.kob.backend.service.record.GetRecordListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class GetRecordListController {
    @Autowired
    private GetRecordListService getRecordListService;

    @GetMapping("/api/record/getlist/")
    public JSONObject getList(@RequestParam Map<String, String> data) {
        System.out.println(data);
        Integer page = Integer.parseInt(data.get("page"));
        return getRecordListService.getList(page);
    }

    @GetMapping("/api/record/get/{id}")
    public Record getById(@PathVariable(value = "id") Integer id) {
        return getRecordListService.getById(id);
    }
}
