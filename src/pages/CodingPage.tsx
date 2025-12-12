import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { Play, RotateCcw } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { cn } from '../lib/utils';

const problems = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
        examples: [
            { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
            { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
        ]
    },
    {
        id: 2,
        title: "Reverse Integer",
        difficulty: "Medium",
        description: "Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range [-2^31, 2^31 - 1], then return 0.",
        examples: [
            { input: "x = 123", output: "321" },
            { input: "x = -123", output: "-321" }
        ]
    },
    {
        id: 3,
        title: "Palindrome Number",
        difficulty: "Easy",
        description: "Given an integer x, return true if x is palindrome integer.",
        examples: [
            { input: "x = 121", output: "true" },
            { input: "x = -121", output: "false" }
        ]
    },
    {
        id: 4,
        title: "Longest Common Prefix",
        difficulty: "Easy",
        description: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string \"\".",
        examples: [
            { input: "strs = [\"flower\",\"flow\",\"flight\"]", output: "\"fl\"" },
            { input: "strs = [\"dog\",\"racecar\",\"car\"]", output: "\"\"" }
        ]
    },
    {
        id: 5,
        title: "Valid Parentheses",
        difficulty: "Easy",
        description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
        examples: [
            { input: "s = \"()\"", output: "true" },
            { input: "s = \"()[]{}\"", output: "true" }
        ]
    },
    {
        id: 6,
        title: "Merge Two Sorted Lists",
        difficulty: "Easy",
        description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list.",
        examples: [
            { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" },
            { input: "list1 = [], list2 = []", output: "[]" }
        ]
    },
    {
        id: 7,
        title: "Search Insert Position",
        difficulty: "Easy",
        description: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.",
        examples: [
            { input: "nums = [1,3,5,6], target = 5", output: "2" },
            { input: "nums = [1,3,5,6], target = 2", output: "1" }
        ]
    },
    {
        id: 8,
        title: "Maximum Subarray",
        difficulty: "Medium",
        description: "Given an integer array nums, find the subarray with the largest sum, and return its sum.",
        examples: [
            { input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", output: "6" },
            { input: "nums = [1]", output: "1" }
        ]
    },
    {
        id: 9,
        title: "Climbing Stairs",
        difficulty: "Easy",
        description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
        examples: [
            { input: "n = 2", output: "2" },
            { input: "n = 3", output: "3" }
        ]
    },
    {
        id: 10,
        title: "Binary Tree Inorder Traversal",
        difficulty: "Easy",
        description: "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
        examples: [
            { input: "root = [1,null,2,3]", output: "[1,3,2]" },
            { input: "root = []", output: "[]" }
        ]
    },
    {
        id: 11,
        title: "Symmetric Tree",
        difficulty: "Easy",
        description: "Given the root of a binary tree, check whether it is a mirror of itself (i.e., symmetric around its center).",
        examples: [
            { input: "root = [1,2,2,3,4,4,3]", output: "true" },
            { input: "root = [1,2,2,null,3,null,3]", output: "false" }
        ]
    },
    {
        id: 12,
        title: "Maximum Depth of Binary Tree",
        difficulty: "Easy",
        description: "Given the root of a binary tree, return its maximum depth.",
        examples: [
            { input: "root = [3,9,20,null,null,15,7]", output: "3" },
            { input: "root = [1,null,2]", output: "2" }
        ]
    },
    {
        id: 13,
        title: "Best Time to Buy and Sell Stock",
        difficulty: "Easy",
        description: "You are given an array prices where prices[i] is the price of a given stock on the ith day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.",
        examples: [
            { input: "prices = [7,1,5,3,6,4]", output: "5" },
            { input: "prices = [7,6,4,3,1]", output: "0" }
        ]
    },
    {
        id: 14,
        title: "Single Number",
        difficulty: "Easy",
        description: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.",
        examples: [
            { input: "nums = [2,2,1]", output: "1" },
            { input: "nums = [4,1,2,1,2]", output: "4" }
        ]
    },
    {
        id: 15,
        title: "Linked List Cycle",
        difficulty: "Easy",
        description: "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
        examples: [
            { input: "head = [3,2,0,-4], pos = 1", output: "true" },
            { input: "head = [1], pos = -1", output: "false" }
        ]
    },
    {
        id: 16,
        title: "Container With Most Water",
        difficulty: "Medium",
        description: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container, such that the container contains the most water.",
        examples: [
            { input: "height = [1,8,6,2,5,4,8,3,7]", output: "49" },
            { input: "height = [1,1]", output: "1" }
        ]
    },
    {
        id: 17,
        title: "3Sum",
        difficulty: "Medium",
        description: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.",
        examples: [
            { input: "nums = [-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]" },
            { input: "nums = [0,1,1]", output: "[]" }
        ]
    },
    {
        id: 18,
        title: "Permutations",
        difficulty: "Medium",
        description: "Given an array nums of distinct integers, return all the possible permutations. You can return the answer in any order.",
        examples: [
            { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]" },
            { input: "nums = [0,1]", output: "[[0,1],[1,0]]" }
        ]
    },
    {
        id: 19,
        title: "Group Anagrams",
        difficulty: "Medium",
        description: "Given an array of strings strs, group the anagrams together. You can return the answer in any order.",
        examples: [
            { input: "strs = [\"eat\",\"tea\",\"tan\",\"ate\",\"nat\",\"bat\"]", output: "[[\"bat\"],[\"nat\",\"tan\"],[\"ate\",\"eat\",\"tea\"]]" },
            { input: "strs = [\"\"]", output: "[[\"\"]]" }
        ]
    },
    {
        id: 20,
        title: "Trapping Rain Water",
        difficulty: "Hard",
        description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
        examples: [
            { input: "height = [0,1,0,2,1,0,1,3,2,1,2,1]", output: "6" },
            { input: "height = [4,2,0,3,2,5]", output: "9" }
        ]
    }
];

export function CodingPage() {
    const [code, setCode] = useState("// Write your solution here\n");
    const [language, setLanguage] = useState('javascript');
    const [output, setOutput] = useState<string[]>([]);
    const [selectedProblem, setSelectedProblem] = useState(problems[0]);
    const [isRunning, setIsRunning] = useState(false);

    const handleRunCode = () => {
        setIsRunning(true);
        setOutput([]);

        // Mock execution delay
        setTimeout(() => {
            const mockOutput = [
                "Running test cases...",
                `Language: ${language}`,
                "Test Case 1: Passed ✅",
                "Test Case 2: Passed ✅",
                "Test Case 3: Passed ✅",
                "All test cases passed! Great job! 🎉"
            ];
            setOutput(mockOutput);
            setIsRunning(false);
        }, 1500);
    };

    const getExtensions = () => {
        switch (language) {
            case 'javascript': return [javascript()];
            case 'python': return [python()];
            case 'java': return [java()];
            case 'cpp': return [cpp()];
            default: return [javascript()];
        }
    };

    return (
        <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row gap-4 p-4">
            {/* Problem Description Panel */}
            <Card className="w-full md:w-1/3 flex flex-col h-full overflow-hidden">
                <CardHeader className="border-b bg-muted/50">
                    <CardTitle className="flex items-center justify-between">
                        <span>Problem List</span>
                    </CardTitle>
                </CardHeader>
                <div className="flex-1 overflow-y-auto p-0">
                    {/* Problem list rendering */}
                    <div className="divide-y">
                        {problems.map((problem) => (
                            <div
                                key={problem.id}
                                className={cn(
                                    "p-4 cursor-pointer hover:bg-accent transition-colors",
                                    selectedProblem.id === problem.id ? "bg-accent" : ""
                                )}
                                onClick={() => setSelectedProblem(problem)}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium">{problem.id}. {problem.title}</span>
                                    <span className={cn(
                                        "text-xs px-2 py-0.5 rounded-full",
                                        problem.difficulty === "Easy" ? "bg-green-500/10 text-green-500" :
                                            problem.difficulty === "Medium" ? "bg-yellow-500/10 text-yellow-500" :
                                                "bg-red-500/10 text-red-500"
                                    )}>
                                        {problem.difficulty}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="p-4 border-t bg-muted/50 h-1/2 overflow-y-auto">
                    <h3 className="font-bold text-lg mb-2">{selectedProblem.title}</h3>
                    <p className="text-muted-foreground mb-4">{selectedProblem.description}</p>

                    <div className="space-y-4">
                        {selectedProblem.examples.map((example, index) => (
                            <div key={index} className="bg-background p-3 rounded-md border">
                                <p className="text-sm font-medium mb-1">Example {index + 1}:</p>
                                <code className="text-xs block mb-1">Input: {example.input}</code>
                                <code className="text-xs block">Output: {example.output}</code>
                            </div>
                        ))}
                    </div>
                </div>
            </Card>

            {/* Code Editor Panel */}
            <div className="flex-1 flex flex-col gap-4">
                <Card className="flex-1 flex flex-col overflow-hidden border-0 ring-1 ring-border">
                    <div className="flex items-center justify-between p-2 border-b bg-muted/50">
                        <div className="flex gap-2">
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="bg-background border rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="javascript">JavaScript</option>
                                <option value="python">Python</option>
                                <option value="java">Java</option>
                                <option value="cpp">C++</option>
                            </select>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCode("// Write your solution here\n")}
                            >
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Reset
                            </Button>
                            <Button size="sm" onClick={handleRunCode} disabled={isRunning}>
                                <Play className="h-4 w-4 mr-2" />
                                {isRunning ? 'Running...' : 'Run Code'}
                            </Button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-hidden">
                        <CodeMirror
                            value={code}
                            height="100%"
                            theme="dark"
                            extensions={getExtensions()}
                            onChange={(value) => setCode(value)}
                            className="h-full text-base"
                        />
                    </div>
                </Card>

                {/* Console Output */}
                <Card className="h-48 flex flex-col">
                    <CardHeader className="py-2 px-4 border-b bg-muted/50 min-h-[40px]">
                        <CardTitle className="text-sm font-medium">Console Output</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-4 font-mono text-sm overflow-y-auto bg-black/90 text-green-400">
                        {output.length === 0 ? (
                            <span className="text-muted-foreground opacity-50">Run your code to see output...</span>
                        ) : (
                            output.map((line, i) => (
                                <div key={i} className="mb-1">{line}</div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
