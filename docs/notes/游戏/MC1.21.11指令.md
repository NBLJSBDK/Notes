# Minecraft 指令速查笔记（已整理）

## 一、装备 / 物品

### 1. 无限耐久鞘翅
```mcfunction
/give @s minecraft:elytra[minecraft:unbreakable={}]
```

### 2. 飞行时间 5 的烟花火箭（64 个）

```mcfunction
/give @s minecraft:firework_rocket[minecraft:fireworks={flight_duration:5}] 64
```

### 3. 瞬间伤害 V 喷溅药水

```mcfunction
/give @p minecraft:splash_potion[minecraft:potion_contents={custom_effects:[{id:"minecraft:instant_damage",amplifier:4,duration:1}]}]
```

### 4. 超级靴子

```mcfunction
/give @s diamond_boots[enchantments={frost_walker:16,protection:4,feather_falling:4,swift_sneak:3,thorns:3,unbreaking:3,mending:1}]
```

---

## 二、生物召唤（极品坐骑）

### 1. 马匹颜色计算规则

**最终 Variant 数值公式：**

```
Variant = (花纹代码 × 256) + 底色代码
```

| 代码 | 底色（Base Color） | 花纹（Markings / Style） |
| -- | -------------- | -------------------- |
| 0  | 白色 White       | 无花纹 None             |
| 1  | 奶油色 Creamy     | 白袜 / 流星斑             |
| 2  | 栗色 Chestnut    | 大块碎白斑                |
| 3  | 棕色 Brown       | 细小黑点                 |
| 4  | 黑色 Black       | 细小白点                 |
| 5  | 灰棕色 Gray       | 无                    |
| 6  | 深褐色 Dark Brown | 无                    |

### 2. 极品马（示例：Variant = 257）

```mcfunction
/summon minecraft:horse ~ ~1 ~ {Tame:1b,Health:30.0f,Variant:257,attributes:[{id:"minecraft:movement_speed",base:0.3375},{id:"minecraft:jump_strength",base:1.0},{id:"minecraft:max_health",base:30.0}]}
```

### 3. 极品驴（带箱子）

```mcfunction
/summon minecraft:donkey ~ ~1 ~ {Tame:1b,ChestedHorse:1b,Health:30.0f,attributes:[{id:"minecraft:movement_speed",base:0.3375},{id:"minecraft:jump_strength",base:1.0},{id:"minecraft:max_health",base:30.0}]}
```

### 4. 极品骡（带箱子）

```mcfunction
/summon minecraft:mule ~ ~1 ~ {Tame:1b,ChestedHorse:1b,Health:30.0f,attributes:[{id:"minecraft:movement_speed",base:0.3375},{id:"minecraft:jump_strength",base:1.0},{id:"minecraft:max_health",base:30.0}]}
```

---

## 三、雷电指令

### 1. 服务器所有玩家遭雷劈

```mcfunction
/execute at @a run summon minecraft:lightning_bolt
```

### 2. 劈最近的非玩家实体

```mcfunction
/execute at @e[type=!player,sort=nearest,limit=1] run summon minecraft:lightning_bolt
```

### 3. 劈最近的玩家（排除指定玩家）

```mcfunction
/execute at @p[name=!note_user] run summon minecraft:lightning_bolt
```

---

## 四、实体操作

### 铁傀儡瞬移到自己身边

```mcfunction
/tp @e[type=minecraft:iron_golem] @s
```

---

## 五、属性 / 状态效果

### 1. 永久设置最大生命值为 40

```mcfunction
/attribute @s minecraft:max_health base set 40
```

### 2. 临时生命提升（10 秒）

```mcfunction
/effect give @s minecraft:health_boost 600 44 true
```

### 3. 1 秒满饱和度（20 tick）

```mcfunction
/effect give @s minecraft:saturation 20 255
```


```
```
