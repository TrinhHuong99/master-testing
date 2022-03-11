<template>
    <b-container>
        <b-row>
            <b-col lg="12">
                <div class="title_question" v-html="question.content" :ref="'select-'+ question.id ">
                                            <!-- <span>{{question.exam_part}}.</span> {{question.content}} -->
                </div>
                <div class="write_1">
                    <div class="content_write">
                        <!-- <textarea v-model="writingContent"  name="" id="" placeholder="Câu trả lời" ></textarea> -->
                        <quill-editor id="question-content" ref="myQuillEditor" toolbar="toolbar2" v-model="writingContent" />
                    </div>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
export default {
    props: {
        content : Object,
    },
    data() {
        return{
            writingContent: '',
        }
    },
    computed: {
        checkValid(){
            return this.content.checkvalid
        }
    },
    created(){
        this.question = JSON.parse(JSON.stringify(this.content))
        this.writingContent = this.question.answers
        console.log(this.question,"ddddd")

        this.$set(this.question, 'checkvalid', false)
    },
    watch: {
        checkValid(){
            this.$store.dispatch('countAnswerOfPart')
        },
        writingContent(value) {
            this.$store.dispatch('setQuestionAnwswer', {
                id: this.question.id,
                value: value,
                write : true
            })
        }
    },
}
</script>
<style scoped>
.title_question{
    color: #0057a7;
    font-weight: 600;
    padding: 0px;
    overflow: hidden;
}
.quill-editor {
    margin-bottom: 10px;
}
/* textarea{
    width: 100%;
    margin: auto;
    border-radius: 10px;
    height: 150px;
} */
</style>