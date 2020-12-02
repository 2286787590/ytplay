var app = new Vue({
    el: "#app",
    data: {
        // 查找关键字
        content: '',
        //歌曲数组
        musicList: [],
        // 歌曲地址
        musicUrl: "",
        // 歌曲封面地址
        picUrl: "",
        // 热门评论
        hotComments: "",
        //歌曲播放状态
        isPlaying: false,
        // mv url
        mvUrl: "",
        isShow: false,

    },
    methods: {
        // 获取歌曲列表
        getMusic: function() {
            var that = this;
            axios.get("https://autumnfish.cn/search?keywords=" + this.content).then(function(response) {
                // console.log(response.data.result.songs);
                that.musicList = response.data.result.songs;
            }, function(err) {
                console.log(err);
            })
        },
        // 歌曲播放
        playMusic: function(musicId) {
            var that = this;
            // 获取当前歌曲的url地址，并赋值给musicUrl  然后通过v-bind传递给audio
            axios.get("https://autumnfish.cn/song/url?id=" + musicId).then(function(response) {
                // console.log(response.data.data[0].url);
                that.musicUrl = response.data.data[0].url;
            }, function(err) {
                console.log(err);
            });
            // 歌曲详情获取
            axios.get("https://autumnfish.cn/song/detail?ids=" + musicId).then(function(response) {
                // console.log(response.data.songs[0].al.picUrl);
                that.picUrl = response.data.songs[0].al.picUrl;
            }, function(err) {
                console.log(err);
            });
            // 获取热门评论及头像
            axios.get("https://autumnfish.cn/comment/hot?type=0&id=" + musicId).then(function(response) {
                console.log(response.data.hotComments);
                that.hotComments = response.data.hotComments;
            }, function(err) {
                console.log(err);
            });
        },
        // 播放动画
        play: function() {
            // 点击开始 添加类
            this.isPlaying = true;
        },
        // 停止动画
        pause: function() {
            // 点击暂停时 去点play类
            this.isPlaying = false;
        },
        //获取mv地址
        getMvUrl: function(mvId) {
            var that = this;
            axios.get("https://autumnfish.cn/mv/url?id=" + mvId).then(function(response) {
                // console.log(response.data.data.url);
                that.mvUrl = response.data.data.url;
                // 显示mv界面并播放mv
                that.isShow = true;
            }, function(err) {})
        },
        // 隐藏遮罩层并暂停mv
        hide: function() {
            this.isShow = false;
            this.mvUrl = "";
        },
    }
})