<template>
  <div>
    <!-- <p>{{ getBoard() }}</p> -->
    <!-- <p>{{ getCount() }}</p> -->
    <p v-show="isShow">{{ getTurn() === 1? '黒' : '白' }}</p>
    <!-- <button @click="countUp">button</button> -->
    <div id="entire-board">
      <div v-for="row in columns" class="row" v-bind:key="row">
        <div v-for="column in columns" class="cell" @click="putPiece($event)" v-bind:key="column">
          <div v-bind:class="pieceColor"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import store from '@/store'
export default {
  name: 'EntireBoard',
  data() {
    return {
      rows: 0,
      columns: 0,
      board:[],
      pieceColor:'',
      isShow: false
    }
  },
  created() {
    this.$store.commit('initBoard');
    this.$store.commit('getPutablePlace');
    this.rows = this.$store.state.board.length;
    this.columns = this.$store.state.board[0].length;
  },
  mounted() {
    const board = this.$store.state.board;
    const putablePlace = this.$store.state.putablePlace;
    const idx = Array.from(this.$el.childNodes).map(elm => elm.id ).indexOf('entire-board')
    board.forEach((row,c_idx) => {
      row.forEach((cell,r_idx) => {
        switch(cell) {
          case 1:
            this.$el.childNodes[idx].childNodes[c_idx].childNodes[r_idx].childNodes[0].classList = 'black'
            break;
          case -1:
            this.$el.childNodes[idx].childNodes[c_idx].childNodes[r_idx].childNodes[0].classList = 'white'
            break;
          case 0:
            this.$el.childNodes[idx].childNodes[c_idx].childNodes[r_idx].childNodes[0].classList = ''
            break;
        }
      })
    })
    board.forEach((row,c_idx) => {
      row.forEach((cell,r_idx) => {
        // judge candidate
        putablePlace.forEach(elm => {
          const candX = elm[0];
          const candY = elm[1];
          const candidatePiece = board[candY][candX]
          if(candidatePiece === 0 && candX === r_idx && candY === c_idx){
            this.$el.childNodes[idx].childNodes[c_idx].childNodes[r_idx].childNodes[0].classList = 'candidate'
          }
        })
      })
    })

  },
  updated() {
    const board = this.$store.state.board;
    this.$store.commit('getPutablePlace');
    const putablePlace = this.$store.state.putablePlace;
    const idx = Array.from(this.$el.childNodes).map(elm => elm.id ).indexOf('entire-board')
    board.forEach((row,c_idx) => {
      row.forEach((cell,r_idx) => {
        // judge actually putted place 
        switch(cell) {
          case 1:
            this.$el.childNodes[idx].childNodes[c_idx].childNodes[r_idx].childNodes[0].classList = 'black'
            break;
          case -1:
            this.$el.childNodes[idx].childNodes[c_idx].childNodes[r_idx].childNodes[0].classList = 'white'
            break;
          case 0:
            this.$el.childNodes[idx].childNodes[c_idx].childNodes[r_idx].childNodes[0].classList = ''
            break;
        }
      })
    });
    board.forEach((row,c_idx) => {
      row.forEach((cell,r_idx) => {
        // judge candidate
        putablePlace.forEach(elm => {
          const candX = elm[0];
          const candY = elm[1];
          const candidatePiece = board[candY][candX]
          if(candidatePiece === 0 && candX === r_idx && candY === c_idx){
            this.$el.childNodes[idx].childNodes[c_idx].childNodes[r_idx].childNodes[0].classList = 'candidate'
          }
        })
      })
    })
    this.turn *= -1;
  },
  methods: {
    getBoard(){
      return this.$store.state.board
    },
    countUp(){
      this.$store.commit('increment')
    },
    getCount(){
      return this.$store.state.count
    },
    putPiece(e) {      
      this.$store.commit('increment')
      const idx = e.path.map(elm => elm.id).indexOf("entire-board");
      let x = Math.floor((e.path[0].offsetLeft - e.path[idx].offsetLeft) / 30);
      let y = Math.floor((e.path[0].offsetTop - e.path[idx].offsetTop) / 30);
      const putablePlace = this.$store.state.putablePlace;
      const putableFlag = putablePlace.filter(elm => {
        return elm[0] === x && elm[1] === y
      }).length > 0;
      if(putableFlag){
        const turn = this.$store.state.turn
        this.$store.commit('putPiece', {x, y, turn})
        this.$store.commit('changeTurn');
        this.$store.commit('reversePiece',{x,y,turn})
      } else {
        console.log('false place')
      }
    },
    getTurn(){
      return this.$store.state.turn
    },
  }
}
</script>
<style>
.cell{
  background-color: #aff0e0;
  width:30px;
  height:30px;
  border-left:solid 1px #000000;
  border-top:solid 1px #000000;
  float:left;
  box-sizing:border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cell:last-child{
  border-right:solid 1px #000000;
}

.row{
  clear:both;
}

.row:last-child>.cell{
  border-bottom:solid 1px #000000;
}

.white{
  border:1px solid #666666;
  border-radius:50%;
  height:20px;
  width:20px;
  background-color: #ffffff;
}
.black{
  border:1px solid #666666;
  border-radius:50%;
  height:20px;
  width:20px;
  background-color: #000000;
}
.candidate{
  background-color: #13792c;
  height:5px;
  width:5px;
  border-radius:50%;
}
</style>
