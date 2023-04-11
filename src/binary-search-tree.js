const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
  constructor() {
    this.rootNode = null;
  }

  root() {
    return this.rootNode;
  }

  add(data) {
    const newNode = new Node(data);

    if (this.rootNode === null) {
      this.rootNode = newNode;
    } else {
      this.addNode(this.rootNode, newNode);
    }
  }

  addNode(node, newNode) {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.addNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.addNode(node.right, newNode);
      }
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    return this.findNode(this.rootNode, data);
  }

  findNode(node, data) {
    if (node === null) {
      return null;
    }

    if (data === node.data) {
      return node;
    }

    if (data < node.data) {
      return this.findNode(node.left, data);
    }

    return this.findNode(node.right, data);
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data);
  }

  removeNode(node, data) {
    if (node === null) {
      return null;
    }

    if (data === node.data) {
      if (node.left === null && node.right === null) {
        return null;
      }

      if (node.left === null) {
        return node.right;
      }

      if (node.right === null) {
        return node.left;
      }

      const minRightNode = this.findMinNode(node.right);
      node.data = minRightNode.data;
      node.right = this.removeNode(node.right, minRightNode.data);
      return node;
    }

    if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    }

    node.right = this.removeNode(node.right, data);
    return node;
  }

  findMinNode(node) {
    if (node.left === null) {
      return node;
    }

    return this.findMinNode(node.left);
  }

  min() {
    if (this.rootNode === null) {
      return null;
    }

    return this.findMinNode(this.rootNode).data;
  }

  findMaxNode(node) {
    if (node.right === null) {
      return node;
    }

    return this.findMaxNode(node.right);
  }

  max() {
    if (this.rootNode === null) {
      return null;
    }

    return this.findMaxNode(this.rootNode).data;
  }
}

module.exports = {
  BinarySearchTree,
};
