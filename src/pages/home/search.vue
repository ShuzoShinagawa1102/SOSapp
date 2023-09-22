<template>
    <div>
        <input type="text" v-model="searchTerm" placeholder="検索ワード..." style="height: 3em; background-color: rgba(202, 204, 199, 0.777); font-size: 150%;" />
        <button @click="search" style="font-size: 180%;">検索</button>
    
        <div v-if="posts.length === 0" style="font-size: 150%;">
        投稿が見つかりません
        </div>
    
        <template v-else>
        <div v-for="(post, index) in posts" :key="index" style="background-color: antiquewhite; border-bottom:solid 2px blue">
            <p>投稿タイプ: {{ post.type }}</p>
            <p>ジャンル: {{ post.genre }}</p>
            <p>都道府県: {{ post.prefecture }}</p>
            <p>日付: {{ post.date }}</p>
            <p>名前: {{ post.name }}</p>
            <p>内容: {{ post.content }}</p>
        </div>
        </template>
    </div>
    </template>
    
    <script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { collection, getDocs, query, where, startAt, endAt } from 'firebase/firestore';
    // ↓ firebaseConfig ↓ //
    import { addDoc, Timestamp } from 'firebase/firestore';
    import { initializeApp } from 'firebase/app';
    import { getFirestore } from 'firebase/firestore';
    const firebaseConfig = {
        apiKey: "AIzaSyCnvOLOgM8A7888OnyZQUtgjPadc-aUGTc",
        authDomain: "appsos-3bdab.firebaseapp.com",
        projectId: "appsos-3bdab",
        storageBucket: "appsos-3bdab.appspot.com",
        messagingSenderId: "781085116494",
        appId: "1:781085116494:web:fe579a52fac5615a361b1f",
        measurementId: "G-0DKFDY6YQP"
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    // Initialize Firestore
    export const db = getFirestore(app);
    // ↑ firebaseConfig ↑ //
    
    export default defineComponent({
    setup() {
        const searchTerm = ref('');
        const posts = ref([]);
    
        const search = async () => {
        posts.value = []; // Clear the posts array
        const q = query(
            collection(db, 'posts'),
            where('content', '>=', searchTerm.value),
            where('content', '<=', searchTerm.value + '\uf8ff')
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            posts.value.push(doc.data());
        });
        };
    
        return { searchTerm, posts, search };
    },
    });
    </script>