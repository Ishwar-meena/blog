---
title: C++ tutorial in Hindi
description: This is a beginner friendly c++ blog
slug: cpp-tutorial-hindi
date: 11/10/2025
author: hackerx
image: https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg

---

# C++ ट्यूटोरियल (हिंदी में)

![C++ Programming](https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=60)

## परिचय

C++ एक शक्तिशाली प्रोग्रामिंग भाषा है जिसका उपयोग गेम डेवलपमेंट, सॉफ्टवेयर डेवलपमेंट, और सिस्टम प्रोग्रामिंग में किया जाता है। यह C भाषा का विस्तार है जिसमें ऑब्जेक्ट ओरिएंटेड प्रोग्रामिंग की सुविधा है।

---

## C++ प्रोग्राम की संरचना

```cpp showLineNumbers
#include <iostream>
using namespace std;

int main() {
    cout << "नमस्ते दुनिया!" << endl;
    return 0;
}
```

**स्पष्टीकरण:**
- `#include <iostream>`: इनपुट/आउटपुट के लिए।
- `using namespace std;`: std नामस्थान का उपयोग।
- `main()`: प्रोग्राम का प्रवेश बिंदु।
- `cout`: आउटपुट के लिए।

---

## वेरिएबल्स और डेटा टाइप्स

```cpp showLineNumbers
int age = 25;
float weight = 65.5;
char grade = 'A';
```

---

## इनपुट लेना

```cpp showLineNumbers
#include <iostream>
using namespace std;

int main() {
    int number;
    cout << "कोई संख्या दर्ज करें: ";
    cin >> number;
    cout << "आपने दर्ज किया: " << number << endl;
    return 0;
}
```

---

## कंडीशनल स्टेटमेंट्स (if-else)

```cpp showLineNumbers
int num = 10;
if(num > 0) {
    cout << "संख्या धनात्मक है";
} else {
    cout << "संख्या ऋणात्मक है";
}
```

---

## लूप्स (for loop)

```cpp showLineNumbers
for(int i = 1; i <= 5; i++) {
    cout << i << " ";
}
```

---

## फंक्शन्स

```cpp showLineNumbers
int add(int a, int b) {
    return a + b;
}

int main() {
    cout << add(5, 3);
    return 0;
}
```

---

## निष्कर्ष

C++ सीखना आसान है यदि आप नियमित अभ्यास करें। ऊपर दिए गए उदाहरणों से शुरुआत करें और खुद से प्रोग्राम लिखने की कोशिश करें।

---

> **आशा है यह ट्यूटोरियल आपके लिए उपयोगी रहा होगा!**

![Code Art](https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=60)
---

## अतिरिक्त संसाधन (External Resources)

- [C++ Documentation (English)](https://en.cppreference.com/w/)
- [GeeksforGeeks C++ (Hindi)](https://www.geeksforgeeks.org/c-plus-plus/)
- [Learn C++ in Hindi (YouTube)](https://www.youtube.com/playlist?list=PLbGui_ZYuhigZkqrHbI_ZkPBrIr5Rsd5L)
- [Programiz C++ Tutorial](https://www.programiz.com/cpp-programming)
- [TutorialsPoint C++ (Hindi)](https://www.tutorialspoint.com/cplusplus/index.htm)

---