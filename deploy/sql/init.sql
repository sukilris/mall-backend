CREATE TABLE `sys_user` (
  `account` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '账号',
  `password` char(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '密码',
  `username` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '姓名',
  `nickname` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '昵称',
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '头像',
  `gender` tinyint DEFAULT '0' COMMENT '性别: 0=保密 1=女 2=男',
  `email` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '邮箱',
  `mobile` char(32) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '手机号',
  `profession_id` int unsigned DEFAULT NULL COMMENT '职称',
  `job_id` int unsigned DEFAULT NULL COMMENT '岗位',
  `dept_id` int unsigned DEFAULT NULL COMMENT '部门',
  `role_ids` text COLLATE utf8mb4_unicode_ci COMMENT '角色集',
  `status` tinyint unsigned DEFAULT '1' COMMENT '状态: 0=禁用 1=开启',
  `order_num` int unsigned DEFAULT '0' COMMENT '排序值',
  `remark` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT '备注',
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='用户';

CREATE TABLE `sys_log` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int unsigned NOT NULL COMMENT '用户ID',
  `ip` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ip',
  `uri` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '请求路径',
  `type` tinyint unsigned NOT NULL COMMENT '类型: 1=登录日志 2=操作日志',
  `request` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '请求数据',
  `status` tinyint unsigned NOT NULL DEFAULT '1' COMMENT '状态: 0=失败 1=成功',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='系统日志';